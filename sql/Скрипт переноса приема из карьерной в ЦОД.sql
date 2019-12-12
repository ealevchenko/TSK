use [ASUTSK]


declare @start datetime
declare @stop datetime

-- ѕолучим врем€ начала запроса и конца
set @start = (select top(1) [start_datetime] from [10.21.4.168].[KRR-PA-CNT-Oil].[dbo].[ReceivingFuel_TSK] order by [start_datetime] desc)
Set @stop = getdate()
-- ѕроверим в таблице есть данные
if (@start is null) begin 
	-- данных нет начнем с начала мес€ца
	--set @start = CONVERT(DATETIME, CONVERT(char(8), getdate(),20) + '01 00:00:00', 102)
	set @start = (SELECT TOP (1) [Start_Date] FROM [ASUTSK].[dbo].[Incomes] where [Start_Date] is not null order by [Start_Date])
	if (@start is null) begin 
		set @start = CONVERT(DATETIME, CONVERT(char(8), getdate(),20) + '01 00:00:00', 102)
	end
end;
-- ѕроверим диапазон запроса
if (@start<@stop)
begin
--select @start, @stop;
insert into [10.21.4.168].[KRR-PA-CNT-Oil].[dbo].[ReceivingFuel_TSK] 
([operator_name]
      ,[create]
      ,[smena_num]
      ,[smena_datetime]
      ,[railway_num_nak]
      ,[railway_num_tanker]
      ,[railway_level]
      ,[railway_volume]
      ,[railway_dens]
      ,[railway_mass]
      ,[railway_temp]
      ,[railway_water_level]
      ,[railway_water_volume]
      ,[start_datetime]
      ,[start_level]
      ,[start_volume]
      ,[start_dens]
      ,[start_mass]
      ,[start_temp]
      ,[start_water_level]
      ,[stop_datetime]
      ,[stop_level]
      ,[stop_volume]
      ,[stop_dens]
      ,[stop_mass]
      ,[stop_temp]
      ,[stop_water_level])
		  select 
		  [operator_name]
      ,[create]
      ,[smena_num]
      ,[smena_datetime]
      ,[railway_num_nak]
      ,[railway_num_tanker]
      ,[railway_level]
      ,[railway_volume]
      ,[railway_dens]
      ,[railway_mass]
      ,[railway_temp]
      ,[railway_water_level]
      ,[railway_water_volume]
      ,[start_datetime]
      ,[start_level]
      ,[start_volume]
      ,[start_dens]
      ,[start_mass]
      ,[start_temp]
      ,[start_water_level]
      ,[stop_datetime]
      ,[stop_level]
      ,[stop_volume]
      ,[stop_dens]
      ,[stop_mass]
      ,[stop_temp]
      ,[stop_water_level]
		from get_receiving_fuel(@start, @stop)
end;