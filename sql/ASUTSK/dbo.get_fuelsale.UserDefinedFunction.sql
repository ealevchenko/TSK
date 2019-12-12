USE [ASUTSK]
GO
/****** Object:  UserDefinedFunction [dbo].[get_fuelsale]    Script Date: 12.12.2019 20:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[get_fuelsale] 
 (
         @start datetime,
         @stop datetime
 )
RETURNS 
@fuel_sale_result Table (
	[id] int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Out_Type] [int] NOT NULL,
	[Target_Volume] [float] NOT NULL,
	[Target_Dens] [float] NOT NULL,
	[Target_Mass] [float] NOT NULL,
	[User] [nvarchar](50) NOT NULL,
	[Crated_Date] [datetime] NOT NULL,
	[Start_Counter] [int] NULL,
	[Start_Level] [float] NULL,
	[Start_Volume] [float] NULL,
	[Start_Mass] [float] NULL,
	[Start_Dens] [float] NULL,
	[Start_Temp] [float] NULL,
	[Start_Water] [float] NULL,
	[Start_Date] [datetime] NULL,
	[End_Counter] [int] NULL,
	[End_Level] [float] NULL,
	[End_Volume] [float] NULL,
	[End_Mass] [float] NULL,
	[End_Dens] [float] NULL,
	[End_Temp] [float] NULL,
	[End_Water] [float] NULL,
	[End_Date] [datetime] NULL,
	[close] [datetime] NULL,
	[RFID] [nvarchar](20) NULL,
	[FLAG_R] [nvarchar](1) NOT NULL,
	[N_TREB] [nvarchar](40) NULL,
	[RSPOS] [nvarchar](10) NULL,
	[N_BAK] [nvarchar](10) NULL,
	[OZM_BAK] [nvarchar](18) NULL,
	[OZM_TREB] [nvarchar](18) NULL,
	[PLOTNOST] [nvarchar](40) NULL,
	[VOLUME] [float] NULL,
	[MASS] [float] NULL,
	[LOGIN_R] [nvarchar](40) NULL,
	[LOGIN_EXP] [nvarchar](20) NULL,
	[N_POST] [nvarchar](2) NULL,
	[TRANSP_FAKT] [nvarchar](40) NULL,
	[LGORT] [nvarchar](4) NULL,
	[WERKS] [nvarchar](4) NULL,
	[N_DEB] [nvarchar](10) NULL,
	[sending] [datetime] NULL
)
AS
BEGIN
--****************************************************************
-- Промежуточная временная таблица
declare @fuel_sale Table (
	[id] int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Out_Type] [int] NOT NULL,
	[Target_Volume] [float] NOT NULL,
	[Target_Dens] [float] NOT NULL,
	[Target_Mass] [float] NOT NULL,
	[User] [nvarchar](50) NOT NULL,
	[Crated_Date] [datetime] NOT NULL,
	[Start_Counter] [int] NULL,
	[Start_Level] [float] NULL,
	[Start_Volume] [float] NULL,
	[Start_Mass] [float] NULL,
	[Start_Dens] [float] NULL,
	[Start_Temp] [float] NULL,
	[Start_Water] [float] NULL,
	[Start_Date] [datetime] NULL,
	[End_Counter] [int] NULL,
	[End_Level] [float] NULL,
	[End_Volume] [float] NULL,
	[End_Mass] [float] NULL,
	[End_Dens] [float] NULL,
	[End_Temp] [float] NULL,
	[End_Water] [float] NULL,
	[End_Date] [datetime] NULL,
	[close] [datetime] NULL,
	[RFID] [nvarchar](20) NULL,
	[FLAG_R] [nvarchar](1) NOT NULL,
	[N_TREB] [nvarchar](40) NULL,
	[RSPOS] [nvarchar](10) NULL,
	[N_BAK] [nvarchar](10) NULL,
	[OZM_BAK] [nvarchar](18) NULL,
	[OZM_TREB] [nvarchar](18) NULL,
	[PLOTNOST] [nvarchar](40) NULL,
	[VOLUME] [float] NULL,
	[MASS] [float] NULL,
	[LOGIN_R] [nvarchar](40) NULL,
	[LOGIN_EXP] [nvarchar](20) NULL,
	[N_POST] [nvarchar](2) NULL,
	[TRANSP_FAKT] [nvarchar](40) NULL,
	[LGORT] [nvarchar](4) NULL,
	[WERKS] [nvarchar](4) NULL,
	[N_DEB] [nvarchar](10) NULL,
	[sending] [datetime] NULL
)
--****************************************************************
-- Получим данные из новой таблицы FuelSale
insert @fuel_sale
SELECT [Out_Type]
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
  FROM [ASUTSK].[dbo].[FuelSale]
  where [Start_Date] > @start and [Start_Date]<=[Start_Date] and [End_Date] is not null
  --****************************************************************
-- Получим данные из старой таблицы Outcomes
insert @fuel_sale
  SELECT 
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
	  ,[close] = [End_Date]
	  ,[RFID] = [Card_Id]
	  ,[FLAG_R] = 0
      ,[N_TREB] = [Nakl_Nom]
      ,[RSPOS] = null
      ,[N_BAK] =1 
      ,[OZM_BAK] = N'000000000107000024'
      ,[OZM_TREB]= N'000000000107000024'
      ,[PLOTNOST] = (CASE WHEN ([Start_Dens] > 0 and [End_Dens] >0) THEN (([End_Dens]+[Start_Dens])/2) ELSE 0 END)
      ,[VOLUME]= (CASE WHEN ([End_Counter]>0 and [Start_Counter]>0) THEN cast(([End_Counter] - [Start_Counter]) as int) ELSE 0 END)
      ,[MASS] = (CASE WHEN ([End_Counter]>0 and [Start_Counter]>0 and [Start_Dens] > 0 and [End_Dens] >0) THEN cast(((([End_Counter] - [Start_Counter]) * (([End_Dens]+[Start_Dens])/2))/1000) as float) ELSE 0 END)
      ,[LOGIN_R] = [User]
      ,[LOGIN_EXP] = null
      ,[N_POST] = null
      ,[TRANSP_FAKT]=[Tr_nom]
      ,[LGORT] = null
      ,[WERKS] = null
      ,[N_DEB]=[Debitor]
      ,[sending]=null
  FROM [ASUTSK].[dbo].[Outcomes]
  where [Start_Date] > @start and [Start_Date]<=[Start_Date] and [End_Date] is not null
    --****************************************************************
-- Получим отсортируем данные по времени и ответим
 insert @fuel_sale_result
  SELECT [Out_Type]
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
  from @fuel_sale order by [Start_Date]

  RETURN
 END



GO
