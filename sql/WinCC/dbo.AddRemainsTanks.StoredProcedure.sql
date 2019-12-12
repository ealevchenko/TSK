USE [CC_HMI_CUNJ_19_12_11_13_11_14R]
GO
/****** Object:  StoredProcedure [dbo].[AddRemainsTanks]    Script Date: 12.12.2019 20:53:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





-- =============================================
-- Description:	Выборка и перенос остатков в емкости
-- =============================================
CREATE PROCEDURE [dbo].[AddRemainsTanks]
AS
BEGIN
	declare @start_report datetime
	declare @stop_report datetime
	declare @date datetime
	declare @date_utl datetime
	declare @time_zone int
	declare @remains table (
			[date] [datetime] NULL,
			[level] float NULL,
			[volume] float NULL,
			[mass] float NULL,
			[dens_avg] float NULL,
			[temp_avg] float NULL,
			[water] float NULL)
	set @time_zone = CAST(SUBSTRING(CONVERT(char(13), GETDATE() - GETUTCDATE() ,20), 13, 1) AS INT);


	-- Проверим наличие таблицы [dbo].[RemainsTanksRW] если нет создадим
	if OBJECT_ID(N'[ASUTSK].[dbo].[RemainsTanks]',N'U') is null
	begin
		CREATE TABLE [dbo].[RemainsTanks](
			[id] [int] IDENTITY(1,1) NOT NULL,
			[date] [datetime] NULL,
			[level] [float] NULL,
			[volume] [float] NULL,
			[mass] [float] NULL,
			[dens_avg] [float] NULL,
			[dens_calc] [float] NULL,
			[temp_avg] [float] NULL,
			[water] [float] NULL,
		 CONSTRAINT [PK_RemainsTanks] PRIMARY KEY CLUSTERED 
		(
			[id] ASC
		)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
		) ON [PRIMARY]
	end

	 --Получим время начала запроса и конца
	set @start_report = (select top(1) [date] from [ASUTSK].[dbo].[RemainsTanks] order by [date] desc);

	Set @stop_report = CONVERT(DATETIME, CONVERT(char(13), getdate() ,20) + ':00:00', 102)

	-- Проверим в таблице есть данные
	if (@start_report is null) begin 
		-- данных нет начнем с начала месяца

		set @start_report = CONVERT(datetime, '2019-12-10 00:00:00', 102)
		end else begin
		set @start_report = DATEADD(HOUR,+1,@start_report)
		end;

		set @date = @start_report;
		 --Проверим диапазон запроса
	if (@start_report<@stop_report)
	begin

	 WHILE @date < @stop_report
	 begin
		 set @date_utl = DATEADD(HOUR,@time_zone*-1,@date) 
		 --**********************************************************

		BEGIN TRY  
			EXEC sp_dropserver @server = 'TRK_LS'
		END TRY  
		BEGIN CATCH 
			--SELECT   
			--    ERROR_NUMBER() AS ErrorNumber  
			--   ,ERROR_MESSAGE() AS ErrorMessage;  
		END CATCH
		DECLARE @Catalogname varchar(255) 
		SET @Catalogname = DB_NAME()
		EXEC sp_addlinkedserver @server = 'TRK_LS',@srvproduct = 'CommonArchiving',  @provider = 'WinCCOLEDBProvider', @datasrc = @@servername, @catalog =  @Catalogname;
		DECLARE @Statement varchar(8000)

		SET @Statement = 'INSERT INTO #TagWincc SELECT * FROM OPENQUERY(TRK_LS,N''Tag:R,(6;7;8;9;10;11),'''''+CONVERT(varchar(23) ,@date_utl, 120)+''''',''''0000-00-00 00:00:00.999'''',1,261 '')  ORDER BY Timestamp ASC'
		if OBJECT_ID(N'TempDB..#TagWincc',N'U') is not null
			begin 
				drop table #TagWincc 
			end 
				create table #TagWincc  	
				( 
					ValueId int, 
					[Timestamp] datetime, 
					Realvalue varchar(250), 
					quality int, 
					flags int 
				)
		--print (@Statement)
		EXECUTE (@Statement)
		--select * from #TagWincc

		insert into @remains
			select 
				DATEADD(HOUR,@time_zone*1,[Timestamp]) as 'datetime',
				SUM(CASE ValueId WHEN 6 THEN CAST(Realvalue AS float) ELSE 0 END) as level,
				SUM(CASE ValueId WHEN 7 THEN CAST(Realvalue AS float) ELSE 0 END) as volume,
				SUM(CASE ValueId WHEN 8 THEN CAST(Realvalue AS float) ELSE 0 END) as mass,
				SUM(CASE ValueId WHEN 9 THEN CAST(Realvalue AS float) ELSE 0 END) as dens_avg,
				SUM(CASE ValueId WHEN 10 THEN CAST(Realvalue AS float) ELSE 0 END) as temp_avg,
				SUM(CASE ValueId WHEN 11 THEN CAST(Realvalue AS float) ELSE 0 END) as water
			FROM #TagWincc
			GROUP BY [Timestamp]
				
			 --****************************************************************
			set @date = DATEADD(HOUR,+1,@date)
			--select @date
		 end

			insert into [ASUTSK].[dbo].[RemainsTanks]
			select
			   [date]
			  ,[level]
			  ,[volume]
			  ,[mass]
			  ,[dens_avg]
			  ,[dens_calc] = (CASE  WHEN [volume] is not null AND [volume]>0  THEN [mass]/[volume]*1000 ELSE 0 END)
			  ,[temp_avg]
			  ,[water]
				from @remains
	end;
END
GO
