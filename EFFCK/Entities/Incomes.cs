namespace EFFCK.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Incomes
    {
        public int Id { get; set; }

        [Required]
        [StringLength(25)]
        public string Cist_nom { get; set; }

        public float? Cist_Level { get; set; }

        public float? Cist_Vol { get; set; }

        public float? Cist_Mass { get; set; }

        public float? Cist_Dens { get; set; }

        public float? Cist_Temp { get; set; }

        public float? Cist_WaterLev { get; set; }

        public float? Cist_WaterVol { get; set; }

        public DateTime Created_Date { get; set; }

        [Required]
        [StringLength(50)]
        public string User { get; set; }

        public float? Start_Level { get; set; }

        public float? Start_Volume { get; set; }

        public float? Start_Mass { get; set; }

        public float? Start_Dens { get; set; }

        public float? Start_Temp { get; set; }

        public float? Start_Water { get; set; }

        public DateTime? Start_Date { get; set; }

        public float? End_Level { get; set; }

        public float? End_Volume { get; set; }

        public float? End_Mass { get; set; }

        public float? End_Dens { get; set; }

        public float? End_Temp { get; set; }

        public float? End_Water { get; set; }

        public DateTime? End_Date { get; set; }

        public int? Outed_During { get; set; }

        [StringLength(50)]
        public string Cist_Nakl_Nom { get; set; }
    }
}
