namespace mst.Models {
    public class UserPassword {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}