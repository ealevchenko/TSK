use [CC_HMI_CUNJ_19_12_11_13_11_14R]

declare @date datetime = convert(datetime, '2019-12-10 22:30:00', 120)

declare @date_utl datetime
declare @time_zone int
set @time_zone = CAST(SUBSTRING(CONVERT(char(13), GETDATE() - GETUTCDATE() ,20), 13, 1) AS INT);
set @date_utl = DATEADD(HOUR,@time_zone*-1,@date)	

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
select * from #TagWincc

declare @remains table (
	[date] [datetime] NULL,
	[level] float NULL,
	[volume] float NULL,
	[mass] float NULL,
	[dens_avg] float NULL,
	[temp_avg] float NULL,
	[water] float NULL)

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

		select
		[date]
      ,[level]
      ,[volume]
      ,[mass]
      ,[dens_avg]
      ,[dens_calc] = [mass]/[volume]*1000
      ,[temp_avg]
      ,[water]
		from @remains
