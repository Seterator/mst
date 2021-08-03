using System;
using System.ComponentModel.DataAnnotations;

namespace mst.Models {
    public class Competition {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Short_description { get; set; }
        public DateTime Begin_date { get; set; }
        public DateTime End_date { get; set; }
    }
}