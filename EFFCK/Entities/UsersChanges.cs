namespace EFFCK.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class UsersChanges
    {
        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string UserName { get; set; }

        [Column(TypeName = "date")]
        public DateTime TimeStartWork { get; set; }

        public TimeSpan DateStartWork { get; set; }
    }
}
