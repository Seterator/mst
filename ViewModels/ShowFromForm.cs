using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace mst.ViewModels {
    public class ShowFromForm { 
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string VideoLink { get; set; }
        public string WebLink { get; set; }
        [FromForm(Name="file")]
        public IFormFile Image { get; set; }
    }
}