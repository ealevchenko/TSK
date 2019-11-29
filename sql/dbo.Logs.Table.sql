USE [ASUTSK]
GO
/****** Object:  Table [dbo].[Logs]    Script Date: 25.11.2019 9:00:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Logs](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[DateTime] [datetime] NOT NULL,
	[UserName] [nvarchar](100) NULL,
	[Level] [int] NULL,
	[Log] [nvarchar](max) NULL,
 CONSTRAINT [PK_Logs] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
