namespace EFDCFuel.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class azsCards
    {
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string Number { get; set; }

        [StringLength(50)]
        public string DriverName { get; set; }

        [Required]
        [StringLength(50)]
        public string AutoNumber { get; set; }

        public int? Debitor { get; set; }

        [StringLength(50)]
        public string Sn1 { get; set; }

        [StringLength(50)]
        public string Sn2 { get; set; }

        [StringLength(50)]
        public string AutoModel { get; set; }

        public int? Street { get; set; }

        public int? House { get; set; }

        [Column(TypeName = "date")]
        public DateTime? CreateDate { get; set; }

        public TimeSpan? CreateTime { get; set; }

        [Column(TypeName = "date")]
        public DateTime? UpdateDate { get; set; }

        public TimeSpan? UpdateTime { get; set; }

        [StringLength(255)]
        public string Owner { get; set; }

        public bool? Active { get; set; }
    }
}
