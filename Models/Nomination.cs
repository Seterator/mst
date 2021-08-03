using System.ComponentModel.DataAnnotations;

namespace mst.Models {
    public class Nomination {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}