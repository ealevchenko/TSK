use [ASUTSK]

declare @start datetime = CONVERT(DATETIME, '2019-12-01 00:00:00', 102)
declare @stop datetime = CONVERT(DATETIME, '2019-12-10 23:59:59', 102)

select * from get_receiving_fuel(@start,@stop)

declare @receiving_fuel Table (
	[id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[operator_name] [nvarchar](50) NOT NULL,
	[create] [datetime] NOT NULL,
	[smena_num] [int] NULL,
	[smena_datetime] [int] NULL,
	[railway_num_nak] [nvarchar](50) NULL,
	[railway_num_tanker] [nvarchar](25) NOT NULL,
	[railway_level] [real] NULL,
	[railway_volume] [real] NULL,
	[railway_dens] [real] NULL,
	[railway_mass] [real] NULL,
	[railway_temp] [real] NULL,
	[railway_water_level] [real] NULL,
	[railway_water_volume] [real] NULL,
	[start_datetime] [datetime] NULL,
	[start_level] [real] NULL,
	[start_volume] [real] NULL,
	[start_dens] [real] NULL,
	[start_mass] [real] NULL,
	[start_temp] [real] NULL,
	[start_water_level] [real] NULL,
	[stop_datetime] [datetime] NULL,
	[stop_level] [real] NULL,
	[stop_volume] [real] NULL,
	[stop_dens] [real] NULL,
	[stop_mass] [real] NULL,
	[stop_temp] [real] NULL,
	[stop_water_level] [real] NULL
)

insert @receiving_fuel
SELECT 
	[operator_name] = [User]
	,[create] = [Created_Date]
   ,[smena_num] = null
   ,[smena_datetime] = null
   ,[railway_num_nak] = [Cist_Nakl_Nom]
   ,[railway_num_tanker] = [Cist_nom]
   ,[railway_level] = [Cist_Level]
   ,[railway_volume] = [Cist_Vol]*1000
   ,[railway_dens] = [Cist_Dens]
   ,[railway_mass] = [Cist_Mass]
   ,[railway_temp] = [Cist_Temp]
   ,[railway_water_level] = [Cist_WaterLev]
   ,[railway_water_volume] = [Cist_WaterVol]
   ,[start_datetime] = [Start_Date]
   ,[start_level] = [Start_Level]
   ,[start_volume] = [Start_Volume]
   ,[start_dens] = [Start_Dens]
   ,[start_mass] = [Start_Mass]
   ,[start_temp] = [Start_Temp]
   ,[start_water_level] = [Start_Water]
   ,[stop_datetime] = [End_Date]
   ,[stop_level] = [End_Level]
   ,[stop_volume] = [End_Volume]
   ,[stop_dens] = [End_Dens]
   ,[stop_mass] = [End_Mass]
   ,[stop_temp] = [End_Temp]
   ,[stop_water_level] = [End_Water]
FROM [ASUTSK].[dbo].[Incomes]  
where [End_Date] is not null and [Start_Date] > @start AND [Start_Date]<= @stop 
order by [Start_Date]

select * from @receiving_fuel

