namespace mst.Models {
    public class UserPassword {
        int UserId { get; set; }
        int UserLogin { get; set; }
        string OldPassword { get; set; }
        string NewPassword { get; set; }
    }
}