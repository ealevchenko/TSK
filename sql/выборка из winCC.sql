
use [CC_HMI_CUNJ_19_12_11_13_11_14R]


declare @date datetime = convert(datetime, '2019-12-10 22:30:00', 120)

print (convert(sysname, @date, 20))

declare @remains_calc table (
					[date] [datetime] NULL,
					[level] float NULL,
					[volume] float NULL,
					[mass] float NULL,
					[dens_avg] float NULL,
					[dens_calc] float NULL,
					[temp_avg] float NULL,
					[water] float NULL)

declare @LS_Name varchar(255)=NULL;
DECLARE @Catalogname varchar(255) 
SET @Catalogname = DB_NAME()

declare @date_utl datetime
declare @time_zone int
set @time_zone = CAST(SUBSTRING(CONVERT(char(13), GETDATE() - GETUTCDATE() ,20), 13, 1) AS INT);

BEGIN TRY  
--print(@LS_Name)
--EXEC sp_addlinkedserver @server = 'TRK_LS',@srvproduct = 'CommonArchiving',  @provider = 'WinCCOLEDBProvider', @datasrc = @@servername, @catalog =  @CatalogName
EXEC sp_dropserver @server = 'TRK_LS'
END TRY  
BEGIN CATCH 
    --SELECT   
    --    ERROR_NUMBER() AS ErrorNumber  
    --   ,ERROR_MESSAGE() AS ErrorMessage;  

END CATCH
EXEC sp_addlinkedserver @server = 'TRK_LS',@srvproduct = 'CommonArchiving',  @provider = 'WinCCOLEDBProvider', @datasrc = @@servername, @catalog =  @CatalogName

			declare @TagWincc table (
				ValueId int, 
				[Timestamp] datetime, 
				Realvalue varchar(250), 
				quality int, 
				flags int 			
			)

			declare @ValueId int
			declare @Timestamp datetime
			declare @Realvalue varchar(250)
			declare @quality int
			declare @flags int 

			DECLARE @Statement varchar(8000)
			--SET @Statement = 'Tag:R,(6;7;8;9;10;11),'''+ convert(sysname, @date, 20)+''',''0000-00-00 00:00:00.999'',1,261 '
			--SET @Statement = convert(varchar(8000), @date, 20);

--INSERT INTO @TagWincc SELECT * FROM OPENQUERY(CA_53,N'Tag:R,(6;7;8;9;10;11),''2019-12-10 22:30:00'',''0000-00-00 00:00:00.999'',1,261 ')  ORDER BY Timestamp ASC
SET @Statement = 'INSERT INTO @TagWincc1 SELECT * FROM OPENQUERY(TRK_LS,N''Tag:R,(6;7;8;9;10;11),''''2019-12-10 22:30:00'''',''''0000-00-00 00:00:00.999'''',1,261 '')  ORDER BY Timestamp ASC'
--exec @Statement;

		EXECUTE sp_executesql
		--N@Statement, 
		'INSERT INTO @TagWincc1 SELECT * FROM OPENQUERY(TRK_LS,N''Tag:R,(6;7;8;9;10;11),''''2019-12-10 22:30:00'''',''''0000-00-00 00:00:00.999'''',1,261 '')  ORDER BY Timestamp ASC',
		N'@TagWincc1 table'
		,@TagWincc1 = @TagWincc OUTPUT

--SELECT @ValueId = ValueId,@Timestamp = [Timestamp], @Realvalue = Realvalue, @quality = quality, @flags = flags FROM OPENQUERY(CA_53,N'Tag:R,(6;7;8;9;10;11),''2019-12-10 22:30:00'',''0000-00-00 00:00:00.999'',1,261 ')  ORDER BY Timestamp ASC

--insert into @TagWincc
 --VALUES (@ValueId, @Timestamp,@Realvalue,@quality,@flags)

 select * from @TagWincc

			declare @remains table (
					[date] [datetime] NULL,
					[level] float NULL,
					[volume] float NULL,
					[mass] float NULL,
					[dens_avg] float NULL,
					[temp_avg] float NULL,
					[water] float NULL		
			)

			insert into @remains
			select 
				DATEADD(HOUR,@time_zone*1,[Timestamp]) as 'datetime',
				SUM(CASE ValueId WHEN 6 THEN CAST(Realvalue AS float) ELSE 0 END) as level,
				SUM(CASE ValueId WHEN 7 THEN CAST(Realvalue AS float) ELSE 0 END) as volume,
				SUM(CASE ValueId WHEN 8 THEN CAST(Realvalue AS float) ELSE 0 END) as mass,
				SUM(CASE ValueId WHEN 9 THEN CAST(Realvalue AS float) ELSE 0 END) as dens_avg,
				SUM(CASE ValueId WHEN 10 THEN CAST(Realvalue AS float) ELSE 0 END) as temp_avg,
				SUM(CASE ValueId WHEN 11 THEN CAST(Realvalue AS float) ELSE 0 END) as water
			FROM @TagWincc
			GROUP BY [Timestamp]

		insert into @remains_calc
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

		select * from @remains_calc