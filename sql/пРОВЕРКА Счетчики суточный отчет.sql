USE [ASUTSK]
GO

  declare @start datetime = convert(datetime,'2020-05-21 07:00:00.000',120)
  declare @stop datetime = convert(datetime,'2020-05-21 19:00:00.000',120)

DECLARE	@return_value int

EXEC	@return_value = [dbo].[Get_Counters]
		@start = @start,
		@stop = @stop

SELECT	'Return Value' = @return_value

GO
