using System.ComponentModel.DataAnnotations;

namespace mst.Models {
    public class Show {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Short_description { get; set; }
        public string Video_link { get; set; }
        public string Web_link { get; set; }
    }
}