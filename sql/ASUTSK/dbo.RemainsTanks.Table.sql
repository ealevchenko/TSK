USE [ASUTSK]
GO
/****** Object:  Table [dbo].[RemainsTanks]    Script Date: 12.12.2019 20:56:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
GO
SET IDENTITY_INSERT [dbo].[RemainsTanks] ON 

INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5393, CAST(N'2019-12-10T00:00:00.003' AS DateTime), 2728.5, 155.463, 130.262, 837.9, 837.89712021509945, 4.168, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5394, CAST(N'2019-12-10T01:00:00.003' AS DateTime), 2691.18, 153.338, 128.482, 837.9, 837.90058563435036, 4.105, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5395, CAST(N'2019-12-10T02:00:00.003' AS DateTime), 2444.7, 139.297, 116.773, 838.3, 838.30233242639827, 3.93, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5396, CAST(N'2019-12-10T03:00:00.003' AS DateTime), 2223.1, 126.671, 106.189, 838.3, 838.30553165286437, 3.93, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5397, CAST(N'2019-12-10T04:00:00.003' AS DateTime), 2220.41, 126.519, 106.06, 838.3, 838.29306270204472, 3.947, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5398, CAST(N'2019-12-10T05:00:00.003' AS DateTime), 2212.3, 126.056, 105.673, 838.3, 838.30202449704893, 3.93, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5399, CAST(N'2019-12-10T06:00:00.003' AS DateTime), 2309.29, 131.581, 110.318, 838.4, 838.403720901954, 3.965, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5400, CAST(N'2019-12-10T07:00:00.003' AS DateTime), 3164.75, 180.304, 151.095, 838, 838.00137545478742, 4.004, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5401, CAST(N'2019-12-10T08:00:00.003' AS DateTime), 3554.35, 202.49, 169.686, 838, 837.996938120401, 4.075, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5402, CAST(N'2019-12-10T09:00:00.003' AS DateTime), 3434.2, 195.648, 163.973, 838.1, 838.102101733726, 4.053, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5403, CAST(N'2019-12-10T10:00:00.003' AS DateTime), 3259.56, 185.703, 155.619, 838, 837.9993861165409, 4.045, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5404, CAST(N'2019-12-10T11:00:00.003' AS DateTime), 3260.41, 185.751, 155.678, 838.1, 838.10046783059033, 4.045, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5405, CAST(N'2019-12-10T12:00:00.003' AS DateTime), 3260.4, 185.751, 155.678, 838.1, 838.10046783059033, 4.06, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5406, CAST(N'2019-12-10T13:00:00.003' AS DateTime), 3260.5, 185.756, 155.682, 838.1, 838.09944227911876, 4.06, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5407, CAST(N'2019-12-10T14:00:00.477' AS DateTime), 3171.53, 180.69, 151.436, 838.1, 838.09840057557153, 4.09, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5408, CAST(N'2019-12-10T15:00:00.207' AS DateTime), 3124.93, 178.037, 149.213, 838.1, 838.10106887894085, 4.082, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5409, CAST(N'2019-12-10T17:00:00.093' AS DateTime), 0, 0, 0, 0, 0, 0, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5410, CAST(N'2019-12-10T18:00:00.253' AS DateTime), 2714, 154.638, 129.586, 838, 837.995835435016, 4.09, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5411, CAST(N'2019-12-10T19:00:00.253' AS DateTime), 2713.2, 154.592, 129.548, 838, 837.99937901055682, 4.09, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5412, CAST(N'2019-12-10T20:00:00.253' AS DateTime), 2713.35, 154.601, 129.555, 838, 837.99587324790912, 4.09, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5413, CAST(N'2019-12-10T21:00:00.253' AS DateTime), 2597.19, 147.985, 124.011, 838, 837.99709430009784, 4.067, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5414, CAST(N'2019-12-10T22:00:00.253' AS DateTime), 2481.4, 141.388, 118.511, 838.2, 838.19701813449512, 4.12, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5415, CAST(N'2019-12-10T23:00:00.253' AS DateTime), 2481.9, 141.416, 118.535, 838.2, 838.20076936131693, 4.12, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5416, CAST(N'2019-12-11T00:00:00.253' AS DateTime), 2481.6, 141.399, 118.521, 838.2, 838.20253325695376, 4.12, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5417, CAST(N'2019-12-11T01:00:00.253' AS DateTime), 2281.91, 130.022, 108.984, 838.2, 838.19661288089708, 4.12, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5418, CAST(N'2019-12-11T02:00:00.253' AS DateTime), 2037.75, 116.111, 97.324, 838.2, 838.19793128988636, 4.15, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5419, CAST(N'2019-12-11T03:00:00.253' AS DateTime), 1892.71, 107.847, 90.3976, 838.2, 838.2022680278543, 4.12, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5420, CAST(N'2019-12-11T04:00:00.253' AS DateTime), 1892.8, 107.852, 90.4018, 838.2, 838.20235137039629, 4.135, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5421, CAST(N'2019-12-11T05:00:00.253' AS DateTime), 1892.5, 107.835, 90.3767, 838.1, 838.10172949413459, 4.15, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5422, CAST(N'2019-12-11T06:00:00.253' AS DateTime), 1893.91, 107.916, 90.4549, 838.2, 838.197301604952, 4.12, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5423, CAST(N'2019-12-11T07:00:00.253' AS DateTime), 1987.13, 113.226, 94.8948, 838.1, 838.1007895713, 4.12, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5424, CAST(N'2019-12-11T08:00:00.253' AS DateTime), 2850.01, 162.383, 135.866, 836.7, 836.70088617650867, 3.919, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5425, CAST(N'2019-12-11T09:00:00.253' AS DateTime), 3272.43, 186.436, 155.916, 836.3, 836.29771074256041, 3.885, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5426, CAST(N'2019-12-11T10:00:00.093' AS DateTime), 3702.32, 210.911, 176.343, 836.1, 836.10148356415732, 3.87, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5427, CAST(N'2019-12-11T12:00:00.447' AS DateTime), 4575.93, 260.617, 217.771, 835.6, 835.59783130033713, 3.855, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5428, CAST(N'2019-12-11T13:00:00.197' AS DateTime), 4426.75, 252.129, 210.704, 835.7, 835.699185734287, 3.87, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5429, CAST(N'2019-12-11T14:00:00.433' AS DateTime), 4240.2, 241.515, 201.834, 835.7, 835.69964598472143, 3.879, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5430, CAST(N'2019-12-11T15:00:00.433' AS DateTime), 3993.5, 227.478, 190.081, 835.6, 835.60168455850669, 3.87, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5431, CAST(N'2019-12-11T16:00:00.433' AS DateTime), 3778.93, 215.27, 179.879, 835.6, 835.59715705857752, 3.909, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5432, CAST(N'2019-12-11T17:00:00.433' AS DateTime), 3744.15, 213.291, 178.226, 835.6, 835.60018941258647, 3.902, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5433, CAST(N'2019-12-11T18:00:00.433' AS DateTime), 3740.49, 213.083, 178.052, 835.6, 835.59927352252407, 3.935, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5434, CAST(N'2019-12-11T19:00:00.433' AS DateTime), 3753.01, 213.795, 178.647, 835.6, 835.59952290745809, 3.935, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5435, CAST(N'2019-12-11T20:00:00.433' AS DateTime), 3746, 213.396, 178.314, 835.6, 835.60141708373169, 3.926, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5436, CAST(N'2019-12-11T21:00:00.433' AS DateTime), 3748.13, 213.517, 178.415, 835.6, 835.60091233953267, 3.928, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5437, CAST(N'2019-12-11T22:00:00.433' AS DateTime), 3511.24, 200.035, 167.149, 835.6, 835.59877021521231, 3.935, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5438, CAST(N'2019-12-11T23:00:00.433' AS DateTime), 3255.26, 185.458, 154.969, 835.6, 835.60159173505588, 3.935, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5439, CAST(N'2019-12-12T00:00:00.433' AS DateTime), 3237.71, 184.459, 154.134, 835.6, 835.60032310703184, 3.935, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5440, CAST(N'2019-12-12T01:00:00.433' AS DateTime), 3260.2, 185.739, 155.185, 835.5, 835.50035264537871, 3.935, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5441, CAST(N'2019-12-12T02:00:00.433' AS DateTime), -1000, -1, -1, -1000, 0, -1000, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5442, CAST(N'2019-12-12T03:00:00.140' AS DateTime), 3083.09, 175.655, 146.759, 835.5, 835.4957160342716, 3.935, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5443, CAST(N'2019-12-12T04:00:00.140' AS DateTime), 2872.51, 163.664, 136.741, 835.5, 835.4983380584614, 3.92, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5444, CAST(N'2019-12-12T05:00:00.140' AS DateTime), 2697.7, 153.709, 128.424, 835.5, 835.50084900688967, 3.855, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5445, CAST(N'2019-12-12T06:00:00.140' AS DateTime), 2695.3, 153.573, 128.325, 835.6, 835.59610087710723, 3.84, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5446, CAST(N'2019-12-12T07:00:00.140' AS DateTime), 3424.95, 195.121, 163.004, 835.4, 835.39957257291621, 3.786, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5447, CAST(N'2019-12-12T08:00:00.140' AS DateTime), 4077.1, 232.235, 193.939, 835.1, 835.098068766551, 3.73, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5448, CAST(N'2019-12-12T09:00:00.140' AS DateTime), 4092.76, 233.126, 194.684, 835.1, 835.10204781963409, 3.715, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5449, CAST(N'2019-12-12T10:00:00.140' AS DateTime), 3985.81, 227.041, 189.624, 835.2, 835.19716703150527, 3.658, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5450, CAST(N'2019-12-12T11:00:00.140' AS DateTime), 3963.71, 225.794, 188.583, 835.2, 835.19934099223178, 3.643, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5451, CAST(N'2019-12-12T12:00:00.140' AS DateTime), 3967.63, 226.029, 188.779, 835.2, 835.198138291989, 3.613, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5452, CAST(N'2019-12-12T13:00:00.140' AS DateTime), 3964.91, 225.866, 188.666, 835.3, 835.30057644798239, 3.59, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5453, CAST(N'2019-12-12T14:00:00.140' AS DateTime), 4010.68, 228.455, 190.806, 835.2, 835.20168085618616, 3.575, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5454, CAST(N'2019-12-12T15:00:00.140' AS DateTime), 4758.63, 271.001, 226.286, 835, 835.000608853842, 3.413, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5455, CAST(N'2019-12-12T16:00:00.140' AS DateTime), 5067.52, 288.558, 241.09, 835.5, 835.49927570886962, 3.393, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5456, CAST(N'2019-12-12T17:00:00.140' AS DateTime), 4906.5, 279.406, 233.444, 835.5, 835.501027179087, 3.373, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5457, CAST(N'2019-12-12T18:00:00.140' AS DateTime), 4906.2, 279.389, 233.429, 835.5, 835.49817637773845, 3.35, 0)
INSERT [dbo].[RemainsTanks] ([id], [date], [level], [volume], [mass], [dens_avg], [dens_calc], [temp_avg], [water]) VALUES (5458, CAST(N'2019-12-12T19:00:00.140' AS DateTime), 4906.3, 279.394, 233.434, 835.5, 835.50112028175261, 3.307, 0)
SET IDENTITY_INSERT [dbo].[RemainsTanks] OFF
