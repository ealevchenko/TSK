USE [ASUTSK]
GO
/****** Object:  Table [dbo].[FuelSale]    Script Date: 12.12.2019 20:56:09 ******/
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
SET IDENTITY_INSERT [dbo].[FuelSale] ON 

INSERT [dbo].[FuelSale] ([id], [Out_Type], [Target_Volume], [Target_Dens], [Target_Mass], [User], [Crated_Date], [Start_Counter], [Start_Level], [Start_Volume], [Start_Mass], [Start_Dens], [Start_Temp], [Start_Water], [Start_Date], [End_Counter], [End_Level], [End_Volume], [End_Mass], [End_Dens], [End_Temp], [End_Water], [End_Date], [close], [RFID], [FLAG_R], [N_TREB], [RSPOS], [N_BAK], [OZM_BAK], [OZM_TREB], [PLOTNOST], [VOLUME], [MASS], [LOGIN_R], [LOGIN_EXP], [N_POST], [TRANSP_FAKT], [LGORT], [WERKS], [N_DEB], [sending]) VALUES (11, 2, 5000, 838.1, 4190.5, N'Бондаренко', CAST(N'2019-12-09T13:52:49.710' AS DateTime), 17032627, 4010.7, 228.45683, 191.49251500000003, 838.2, 3.905, 0, CAST(N'2019-12-09T13:52:59.000' AS DateTime), 17037627, 3932.912, 224.030721, 187.804954, 838.3, 3.913, 0, CAST(N'2019-12-09T14:13:14.000' AS DateTime), CAST(N'2019-12-10T13:36:32.000' AS DateTime), N'45,15413', N'2', N'0004781446', N'0001', N'1', N'000000000107000024', N'000000000107000024', N'838.250000', 5000, 4191.25, N'Бондаренко', N'тттт', N'', N'АЕ 0406 КВ', NULL, NULL, NULL, CAST(N'2019-12-10T13:36:32.000' AS DateTime))
INSERT [dbo].[FuelSale] ([id], [Out_Type], [Target_Volume], [Target_Dens], [Target_Mass], [User], [Crated_Date], [Start_Counter], [Start_Level], [Start_Volume], [Start_Mass], [Start_Dens], [Start_Temp], [Start_Water], [Start_Date], [End_Counter], [End_Level], [End_Volume], [End_Mass], [End_Dens], [End_Temp], [End_Water], [End_Date], [close], [RFID], [FLAG_R], [N_TREB], [RSPOS], [N_BAK], [OZM_BAK], [OZM_TREB], [PLOTNOST], [VOLUME], [MASS], [LOGIN_R], [LOGIN_EXP], [N_POST], [TRANSP_FAKT], [LGORT], [WERKS], [N_DEB], [sending]) VALUES (12, 2, 7100, 838.1, 5950.51, N'Король', CAST(N'2019-12-10T13:41:06.660' AS DateTime), 17145524, 3260.45, 185.75360500000002, 155.680096, 838.1, 4.082, 0, CAST(N'2019-12-10T13:41:25.000' AS DateTime), 17152624, 3130.225, 178.338825, 149.447935, 838, 4.082, 0, CAST(N'2019-12-10T14:10:30.000' AS DateTime), CAST(N'2019-12-10T14:12:53.000' AS DateTime), N'45,15413', N'2', N'0004781447', N'0001', N'1', N'000000000107000024', N'000000000107000024', N'838.050000', 7100, 5950.155, N'Король', N'ттттт', N'', N'АЕ 0406 КВ', NULL, NULL, NULL, CAST(N'2019-12-10T14:12:53.000' AS DateTime))
INSERT [dbo].[FuelSale] ([id], [Out_Type], [Target_Volume], [Target_Dens], [Target_Mass], [User], [Crated_Date], [Start_Counter], [Start_Level], [Start_Volume], [Start_Mass], [Start_Dens], [Start_Temp], [Start_Water], [Start_Date], [End_Counter], [End_Level], [End_Volume], [End_Mass], [End_Dens], [End_Temp], [End_Water], [End_Date], [close], [RFID], [FLAG_R], [N_TREB], [RSPOS], [N_BAK], [OZM_BAK], [OZM_TREB], [PLOTNOST], [VOLUME], [MASS], [LOGIN_R], [LOGIN_EXP], [N_POST], [TRANSP_FAKT], [LGORT], [WERKS], [N_DEB], [sending]) VALUES (13, 2, 24170, 838, 20254.46, N'Король', CAST(N'2019-12-10T14:24:11.320' AS DateTime), 17152624, 3128.6, 178.24620000000002, 149.370316, 838, 4.09, 0, CAST(N'2019-12-10T14:24:18.000' AS DateTime), 17152876, 3124.688, 178.018912, 149.197651, 838.1, 4.09, 0, CAST(N'2019-12-10T14:25:37.000' AS DateTime), CAST(N'2019-12-10T14:32:29.000' AS DateTime), N'45,15044', N'4', N'1471', NULL, N'1', N'000000000107000024', N'107000024', N'838.050000', 252, 211.1886, N'Король', N'тттттт', N'', N'Т 06667 АЕ', N'080', N'10', NULL, CAST(N'2019-12-10T14:32:29.000' AS DateTime))
INSERT [dbo].[FuelSale] ([id], [Out_Type], [Target_Volume], [Target_Dens], [Target_Mass], [User], [Crated_Date], [Start_Counter], [Start_Level], [Start_Volume], [Start_Mass], [Start_Dens], [Start_Temp], [Start_Water], [Start_Date], [End_Counter], [End_Level], [End_Volume], [End_Mass], [End_Dens], [End_Temp], [End_Water], [End_Date], [close], [RFID], [FLAG_R], [N_TREB], [RSPOS], [N_BAK], [OZM_BAK], [OZM_TREB], [PLOTNOST], [VOLUME], [MASS], [LOGIN_R], [LOGIN_EXP], [N_POST], [TRANSP_FAKT], [LGORT], [WERKS], [N_DEB], [sending]) VALUES (14, 1, 3000, 835.6, 2506.8, N'Данилейко', CAST(N'2019-12-11T12:29:39.733' AS DateTime), 1291699, 4475.238, 254.888014, 213.009913, 835.7, 3.862, 0, CAST(N'2019-12-11T12:30:08.000' AS DateTime), 1291699, 4475.613, 254.909351, 213.02774499999998, 835.7, 3.87, 0, CAST(N'2019-12-11T12:30:27.000' AS DateTime), CAST(N'2019-12-11T12:30:27.000' AS DateTime), N'115,20815', N'2', N'0004781447', N'0001', N'1', N'000000000107000024', N'000000000107000024', N'835.700000', 0, 0, N'Данилейко', N'nnnn', N'', N'21', NULL, NULL, NULL, CAST(N'2019-12-11T12:30:27.000' AS DateTime))
INSERT [dbo].[FuelSale] ([id], [Out_Type], [Target_Volume], [Target_Dens], [Target_Mass], [User], [Crated_Date], [Start_Counter], [Start_Level], [Start_Volume], [Start_Mass], [Start_Dens], [Start_Temp], [Start_Water], [Start_Date], [End_Counter], [End_Level], [End_Volume], [End_Mass], [End_Dens], [End_Temp], [End_Water], [End_Date], [close], [RFID], [FLAG_R], [N_TREB], [RSPOS], [N_BAK], [OZM_BAK], [OZM_TREB], [PLOTNOST], [VOLUME], [MASS], [LOGIN_R], [LOGIN_EXP], [N_POST], [TRANSP_FAKT], [LGORT], [WERKS], [N_DEB], [sending]) VALUES (15, 1, 3000, 835.7, 2507.1, N'Данилейко', CAST(N'2019-12-11T12:31:09.583' AS DateTime), 1291699, 4476.175, 254.941358, 213.054492, 835.7, 3.848, 0, CAST(N'2019-12-11T12:31:13.000' AS DateTime), 1291700, 4475.938, 254.92784400000002, 213.017706, 835.6, 3.862, 0, CAST(N'2019-12-11T12:32:50.000' AS DateTime), CAST(N'2019-12-11T12:32:55.000' AS DateTime), N'115,20815', N'2', N'0004781447', N'0001', N'1', N'000000000107000024', N'000000000107000024', N'835.650000', 1, 0.83565, N'Данилейко', N'ттт', N'', N'21', NULL, NULL, NULL, CAST(N'2019-12-11T12:32:55.000' AS DateTime))
INSERT [dbo].[FuelSale] ([id], [Out_Type], [Target_Volume], [Target_Dens], [Target_Mass], [User], [Crated_Date], [Start_Counter], [Start_Level], [Start_Volume], [Start_Mass], [Start_Dens], [Start_Temp], [Start_Water], [Start_Date], [End_Counter], [End_Level], [End_Volume], [End_Mass], [End_Dens], [End_Temp], [End_Water], [End_Date], [close], [RFID], [FLAG_R], [N_TREB], [RSPOS], [N_BAK], [OZM_BAK], [OZM_TREB], [PLOTNOST], [VOLUME], [MASS], [LOGIN_R], [LOGIN_EXP], [N_POST], [TRANSP_FAKT], [LGORT], [WERKS], [N_DEB], [sending]) VALUES (16, 1, 3000, 835.6, 2506.8, N'Данилейко', CAST(N'2019-12-11T12:33:22.510' AS DateTime), 1291700, 4476.337, 254.950604, 213.036724, 835.6, 3.863, 0, CAST(N'2019-12-11T12:33:27.000' AS DateTime), 1291700, 4476.412, 254.95487100000003, 213.065786, 835.7, 3.87, 0, CAST(N'2019-12-11T12:33:56.000' AS DateTime), CAST(N'2019-12-11T12:33:58.000' AS DateTime), N'115,20815', N'2', N'0004781447', N'0001', N'1', N'000000000107000024', N'000000000107000024', N'835.650000', 0, 0, N'Данилейко', N'тттт', N'', N'21', NULL, NULL, NULL, CAST(N'2019-12-11T12:33:58.000' AS DateTime))
INSERT [dbo].[FuelSale] ([id], [Out_Type], [Target_Volume], [Target_Dens], [Target_Mass], [User], [Crated_Date], [Start_Counter], [Start_Level], [Start_Volume], [Start_Mass], [Start_Dens], [Start_Temp], [Start_Water], [Start_Date], [End_Counter], [End_Level], [End_Volume], [End_Mass], [End_Dens], [End_Temp], [End_Water], [End_Date], [close], [RFID], [FLAG_R], [N_TREB], [RSPOS], [N_BAK], [OZM_BAK], [OZM_TREB], [PLOTNOST], [VOLUME], [MASS], [LOGIN_R], [LOGIN_EXP], [N_POST], [TRANSP_FAKT], [LGORT], [WERKS], [N_DEB], [sending]) VALUES (17, 1, 3000, 835.6, 2506.8, N'Данилейко', CAST(N'2019-12-11T12:35:26.340' AS DateTime), 1291700, 4475.5, 254.90295, 213.022395, 835.7, 3.855, 0, CAST(N'2019-12-11T12:35:43.000' AS DateTime), 1294700, 4421.738, 251.843864, 210.465917, 835.7, 3.863, 0, CAST(N'2019-12-11T12:47:33.000' AS DateTime), CAST(N'2019-12-11T12:47:38.000' AS DateTime), N'115,20815', N'2', N'0004781447', N'0001', N'1', N'000000000107000024', N'000000000107000024', N'835.700000', 3000, 2507.1, N'Данилейко', N'рр', N'', N'21', NULL, NULL, NULL, CAST(N'2019-12-11T12:47:38.000' AS DateTime))
INSERT [dbo].[FuelSale] ([id], [Out_Type], [Target_Volume], [Target_Dens], [Target_Mass], [User], [Crated_Date], [Start_Counter], [Start_Level], [Start_Volume], [Start_Mass], [Start_Dens], [Start_Temp], [Start_Water], [Start_Date], [End_Counter], [End_Level], [End_Volume], [End_Mass], [End_Dens], [End_Temp], [End_Water], [End_Date], [close], [RFID], [FLAG_R], [N_TREB], [RSPOS], [N_BAK], [OZM_BAK], [OZM_TREB], [PLOTNOST], [VOLUME], [MASS], [LOGIN_R], [LOGIN_EXP], [N_POST], [TRANSP_FAKT], [LGORT], [WERKS], [N_DEB], [sending]) VALUES (18, 2, 33500, 835.7, 27995.95, N'Данилейко', CAST(N'2019-12-11T12:53:11.813' AS DateTime), 17223795, 4426, 252.0864, 210.643396, 835.6, 3.862, 0, CAST(N'2019-12-11T12:53:21.000' AS DateTime), 17223795, 4426, 252.0864, 210.643396, 835.6, 3.862, 0, CAST(N'2019-12-11T12:53:23.000' AS DateTime), CAST(N'2019-12-11T12:53:29.000' AS DateTime), N'45,15044', N'4', N'1451', NULL, N'1', N'000000000107000024', N'107000024', N'835.600000', 0, 0, N'Данилейко', N'nnnnn', N'', N'Т 06667 АЕ', N'705D', N'10', NULL, CAST(N'2019-12-11T12:53:29.000' AS DateTime))
INSERT [dbo].[FuelSale] ([id], [Out_Type], [Target_Volume], [Target_Dens], [Target_Mass], [User], [Crated_Date], [Start_Counter], [Start_Level], [Start_Volume], [Start_Mass], [Start_Dens], [Start_Temp], [Start_Water], [Start_Date], [End_Counter], [End_Level], [End_Volume], [End_Mass], [End_Dens], [End_Temp], [End_Water], [End_Date], [close], [RFID], [FLAG_R], [N_TREB], [RSPOS], [N_BAK], [OZM_BAK], [OZM_TREB], [PLOTNOST], [VOLUME], [MASS], [LOGIN_R], [LOGIN_EXP], [N_POST], [TRANSP_FAKT], [LGORT], [WERKS], [N_DEB], [sending]) VALUES (19, 2, 33500, 835.7, 27995.95, N'Данилейко', CAST(N'2019-12-11T12:55:19.557' AS DateTime), 17223795, 4426.35, 252.106315, 210.685247, 835.7, 3.87, 0, CAST(N'2019-12-11T12:55:39.000' AS DateTime), 17223795, 4426.337, 252.105604, 210.684653, 835.7, 3.87, 0, CAST(N'2019-12-11T12:55:41.000' AS DateTime), CAST(N'2019-12-11T12:55:42.000' AS DateTime), N'45,15044', N'2', N'0004797200', N'0001', N'1', N'000000000107000024', N'000000000107000024', N'835.700000', 0, 0, N'Данилейко', N'тттт', N'', N'Т 06667 АЕ', NULL, NULL, NULL, CAST(N'2019-12-11T12:55:42.000' AS DateTime))
INSERT [dbo].[FuelSale] ([id], [Out_Type], [Target_Volume], [Target_Dens], [Target_Mass], [User], [Crated_Date], [Start_Counter], [Start_Level], [Start_Volume], [Start_Mass], [Start_Dens], [Start_Temp], [Start_Water], [Start_Date], [End_Counter], [End_Level], [End_Volume], [End_Mass], [End_Dens], [End_Temp], [End_Water], [End_Date], [close], [RFID], [FLAG_R], [N_TREB], [RSPOS], [N_BAK], [OZM_BAK], [OZM_TREB], [PLOTNOST], [VOLUME], [MASS], [LOGIN_R], [LOGIN_EXP], [N_POST], [TRANSP_FAKT], [LGORT], [WERKS], [N_DEB], [sending]) VALUES (20, 2, 33500, 835.7, 27995.95, N'Данилейко', CAST(N'2019-12-11T13:00:48.020' AS DateTime), 17223795, 4427.012, 252.144011, 210.71675, 835.7, 3.87, 0, CAST(N'2019-12-11T13:00:53.000' AS DateTime), 17223795, 4427.037, 252.145434, 210.717939, 835.7, 3.87, 0, CAST(N'2019-12-11T13:00:54.000' AS DateTime), NULL, NULL, N'7', NULL, NULL, N'1', N'000000000107000024', NULL, NULL, NULL, NULL, N'Данилейко', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[FuelSale] ([id], [Out_Type], [Target_Volume], [Target_Dens], [Target_Mass], [User], [Crated_Date], [Start_Counter], [Start_Level], [Start_Volume], [Start_Mass], [Start_Dens], [Start_Temp], [Start_Water], [Start_Date], [End_Counter], [End_Level], [End_Volume], [End_Mass], [End_Dens], [End_Temp], [End_Water], [End_Date], [close], [RFID], [FLAG_R], [N_TREB], [RSPOS], [N_BAK], [OZM_BAK], [OZM_TREB], [PLOTNOST], [VOLUME], [MASS], [LOGIN_R], [LOGIN_EXP], [N_POST], [TRANSP_FAKT], [LGORT], [WERKS], [N_DEB], [sending]) VALUES (21, 2, 33500, 835.6, 27992.6, N'Данилейко', CAST(N'2019-12-11T13:05:03.620' AS DateTime), 17223795, 4427.325, 252.161792, 210.706394, 835.6, 3.87, 0, CAST(N'2019-12-11T13:05:09.000' AS DateTime), 17223795, 4427.325, 252.163926, 210.708177, 835.6, 3.87, 0, CAST(N'2019-12-11T13:05:11.000' AS DateTime), NULL, NULL, N'7', NULL, NULL, N'1', N'000000000107000024', NULL, NULL, NULL, NULL, N'Данилейко', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[FuelSale] OFF
