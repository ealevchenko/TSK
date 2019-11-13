namespace EFFCK.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("FuelSale")]
    public partial class FuelSale
    {
        public int id { get; set; }

        public int Out_Type { get; set; }

        public double Target_Volume { get; set; }

        public double Target_Dens { get; set; }

        public double Target_Mass { get; set; }

        [Required]
        [StringLength(50)]
        public string User { get; set; }

        public DateTime Crated_Date { get; set; }

        public int? Start_Counter { get; set; }

        public double? Start_Level { get; set; }

        public double? Start_Volume { get; set; }

        public double? Start_Mass { get; set; }

        public double? Start_Dens { get; set; }

        public double? Start_Temp { get; set; }

        public double? Start_Water { get; set; }

        public DateTime? Start_Date { get; set; }

        public int? End_Counter { get; set; }

        public double? End_Level { get; set; }

        public double? End_Volume { get; set; }

        public double? End_Mass { get; set; }

        public double? End_Dens { get; set; }

        public double? End_Temp { get; set; }

        public double? End_Water { get; set; }

        public DateTime? End_Date { get; set; }

        public DateTime? close { get; set; }

        [StringLength(20)]
        public string RFID { get; set; }

        [Required]
        [StringLength(1)]
        public string FLAG_R { get; set; }

        [StringLength(40)]
        public string N_TREB { get; set; }

        [StringLength(10)]
        public string RSPOS { get; set; }

        [StringLength(10)]
        public string N_BAK { get; set; }

        [StringLength(18)]
        public string OZM_BAK { get; set; }

        [StringLength(18)]
        public string OZM_TREB { get; set; }

        [StringLength(40)]
        public string PLOTNOST { get; set; }

        public double? VOLUME { get; set; }

        public double? MASS { get; set; }

        [StringLength(40)]
        public string LOGIN_R { get; set; }

        [StringLength(20)]
        public string LOGIN_EXP { get; set; }

        [StringLength(2)]
        public string N_POST { get; set; }

        [StringLength(40)]
        public string TRANSP_FAKT { get; set; }

        [StringLength(4)]
        public string LGORT { get; set; }

        [StringLength(4)]
        public string WERKS { get; set; }

        [StringLength(10)]
        public string N_DEB { get; set; }

        public DateTime? sending { get; set; }
    }
}
