using System.ComponentModel.DataAnnotations;

namespace mst.Models {
    public class Show {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string VideoLink { get; set; }
        public string WebLink { get; set; }
        public byte[] Image { get; set; }
    }
}