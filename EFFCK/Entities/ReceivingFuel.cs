using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFFCK.Entities
{
    public class ReceivingFuel
    {
        public int id { get; set; }
        public string operator_name { get; set; }
        public DateTime create { get; set; }
        public int? smena_num { get; set; }
        public int? smena_datetime { get; set; }
        public string railway_num_nak { get; set; }
        public string railway_num_tanker { get; set; }
        public float? railway_level { get; set; }
        public float? railway_volume { get; set; }
        public float? railway_dens { get; set; }
        public float? railway_mass { get; set; }
        public float? railway_temp { get; set; }
        public float? railway_water_level { get; set; }
        public float? railway_water_volume { get; set; }
        public DateTime? start_datetime { get; set; }
        public float? start_level { get; set; }
        public float? start_volume { get; set; }
        public float? start_dens { get; set; }
        public float? start_mass { get; set; }
        public float? start_temp { get; set; }
        public float? start_water_level { get; set; }
        public DateTime? stop_datetime { get; set; }
        public float? stop_level { get; set; }
        public float? stop_volume { get; set; }
        public float? stop_dens { get; set; }
        public float? stop_mass { get; set; }
        public float? stop_temp { get; set; }
        public float? stop_water_level { get; set; }
    }
}
