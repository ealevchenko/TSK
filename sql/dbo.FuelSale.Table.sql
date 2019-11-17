USE [ASUTSK]
GO
/****** Object:  Table [dbo].[FuelSale]    Script Date: 17.11.2019 18:23:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FuelSale](
	[id] [int] IDENTITY(1,1) NOT NULL,
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
	[sending] [datetime] NULL,
 CONSTRAINT [PK_FuelSale] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
