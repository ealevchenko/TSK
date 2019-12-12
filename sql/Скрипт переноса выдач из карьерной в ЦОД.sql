use [ASUTSK]


declare @start datetime
declare @stop datetime

-- ѕолучим врем€ начала запроса и конца
set @start = (select top(1) [Start_Date] from [10.21.4.168].[KRR-PA-CNT-Oil].[dbo].[FuelSale_TSK] order by [Start_Date] desc)
Set @stop = getdate()
-- ѕроверим в таблице есть данные
if (@start is null) begin 
	-- данных нет начнем с начала мес€ца
	set @start = CONVERT(DATETIME, CONVERT(char(8), getdate(),20) + '01 00:00:00', 102)
end;
-- ѕроверим диапазон запроса
if (@start<@stop)
begin
-- select @start, @stop;
insert into [10.21.4.168].[KRR-PA-CNT-Oil].[dbo].[FuelSale_TSK]
	([Out_Type]
		  ,[Target_Volume]
		  ,[Target_Dens]
		  ,[Target_Mass]
		  ,[User]
		  ,[Crated_Date]
		  ,[Start_Counter]
		  ,[Start_Level]
		  ,[Start_Volume]
		  ,[Start_Mass]
		  ,[Start_Dens]
		  ,[Start_Temp]
		  ,[Start_Water]
		  ,[Start_Date]
		  ,[End_Counter]
		  ,[End_Level]
		  ,[End_Volume]
		  ,[End_Mass]
		  ,[End_Dens]
		  ,[End_Temp]
		  ,[End_Water]
		  ,[End_Date]
		  ,[close]
		  ,[RFID]
		  ,[FLAG_R]
		  ,[N_TREB]
		  ,[RSPOS]
		  ,[N_BAK]
		  ,[OZM_BAK]
		  ,[OZM_TREB]
		  ,[PLOTNOST]
		  ,[VOLUME]
		  ,[MASS]
		  ,[LOGIN_R]
		  ,[LOGIN_EXP]
		  ,[N_POST]
		  ,[TRANSP_FAKT]
		  ,[LGORT]
		  ,[WERKS]
		  ,[N_DEB]
		  ,[sending]) 
		  
		  select 
		  [Out_Type]
		  ,[Target_Volume]
		  ,[Target_Dens]
		  ,[Target_Mass]
		  ,[User]
		  ,[Crated_Date]
		  ,[Start_Counter]
		  ,[Start_Level]
		  ,[Start_Volume]
		  ,[Start_Mass]
		  ,[Start_Dens]
		  ,[Start_Temp]
		  ,[Start_Water]
		  ,[Start_Date]
		  ,[End_Counter]
		  ,[End_Level]
		  ,[End_Volume]
		  ,[End_Mass]
		  ,[End_Dens]
		  ,[End_Temp]
		  ,[End_Water]
		  ,[End_Date]
		  ,[close]
		  ,[RFID]
		  ,[FLAG_R]
		  ,[N_TREB]
		  ,[RSPOS]
		  ,[N_BAK]
		  ,[OZM_BAK]
		  ,[OZM_TREB]
		  ,[PLOTNOST]
		  ,[VOLUME]
		  ,[MASS]
		  ,[LOGIN_R]
		  ,[LOGIN_EXP]
		  ,[N_POST]
		  ,[TRANSP_FAKT]
		  ,[LGORT]
		  ,[WERKS]
		  ,[N_DEB]
		  ,[sending]
		  from get_fuelsale(@start, @stop)
end;