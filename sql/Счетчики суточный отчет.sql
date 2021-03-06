/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT [Id]
      ,[Date]
      ,[trkBig]
      ,[trkSmall]
  FROM [ASUTSK].[dbo].[TRKcounters]
  where [Date] >= convert(datetime,'2020-05-23 07:00:00',120) and [Date] <= convert(datetime,'2020-05-23 19:00:00.000',120)
  order by 1 desc

  SELECT top(1)[Id]
      ,[Date]
      ,[trkBig]
      ,[trkSmall]
  FROM [ASUTSK].[dbo].[TRKcounters]
  where [Date] >= convert(datetime,'2020-05-23 07:00:00.000',120)
  --order by 1 desc  
  
  SELECT top(1)[Id]
      ,[Date]
      ,[trkBig]
      ,[trkSmall]
  FROM [ASUTSK].[dbo].[TRKcounters]
  where [Date] <= convert(datetime,'2020-05-23 19:00:00',120)
  order by 1 desc

  select 
  [count] = 'Тепловозы',
  [trkBigStart] = (select top(1) [trkBig] FROM [ASUTSK].[dbo].[TRKcounters] where [Date] >= convert(datetime,'2020-05-23 07:00:00.000',120)),
  [trkBigStop] = (select top(1) [trkBig] FROM [ASUTSK].[dbo].[TRKcounters] where [Date] <= convert(datetime,'2020-05-23 19:00:00.000',120) order by 1 desc),
  [diff] = (select top(1) [trkBig] FROM [ASUTSK].[dbo].[TRKcounters] where [Date] <= convert(datetime,'2020-05-23 19:00:00.000',120) order by 1 desc) - (select top(1) [trkBig] FROM [ASUTSK].[dbo].[TRKcounters] where [Date] >= convert(datetime,'2020-05-23 07:00:00.000',120))
  union
  select
  [count] = 'Бензовозы',
  [trkSmallStart] = (select top(1) [trkSmall] FROM [ASUTSK].[dbo].[TRKcounters] where [Date] >= convert(datetime,'2020-05-23 07:00:00.000',120)),
  [trkSmallStop] = (select top(1) [trkSmall] FROM [ASUTSK].[dbo].[TRKcounters] where [Date] <= convert(datetime,'2020-05-23 19:00:00.000',120) order by 1 desc),
  [diff] = (select top(1) [trkSmall] FROM [ASUTSK].[dbo].[TRKcounters] where [Date] <= convert(datetime,'2020-05-23 19:00:00.000',120) order by 1 desc) - (select top(1) [trkSmall] FROM [ASUTSK].[dbo].[TRKcounters] where [Date] >= convert(datetime,'2020-05-23 07:00:00.000',120))


  declare @start datetime = convert(datetime,'2020-05-23 07:00:00.000',120)
  declare @stop datetime = convert(datetime,'2020-05-23 19:00:00.000',120)

  select 
  [count] = 'Тепловозы',
  [trkBigStart] = (select top(1) [trkBig] FROM [ASUTSK].[dbo].[TRKcounters] where [Date] >= @start),
  [trkBigStop] = (select top(1) [trkBig] FROM [ASUTSK].[dbo].[TRKcounters] where [Date] <= @stop order by 1 desc),
  [diff] = (select top(1) [trkBig] FROM [ASUTSK].[dbo].[TRKcounters] where [Date] <= @stop order by 1 desc) - (select top(1) [trkBig] FROM [ASUTSK].[dbo].[TRKcounters] where [Date] >= @start)
  union
  select
  [count] = 'Бензовозы',
  [trkSmallStart] = (select top(1) [trkSmall] FROM [ASUTSK].[dbo].[TRKcounters] where [Date] >= @start),
  [trkSmallStop] = (select top(1) [trkSmall] FROM [ASUTSK].[dbo].[TRKcounters] where [Date] <= @stop order by 1 desc),
  [diff] = (select top(1) [trkSmall] FROM [ASUTSK].[dbo].[TRKcounters] where [Date] <= @stop order by 1 desc) - (select top(1) [trkSmall] FROM [ASUTSK].[dbo].[TRKcounters] where [Date] >= @start)