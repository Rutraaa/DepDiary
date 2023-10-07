namespace DepDiary.Models.User;

public class AddUserRequest
{
    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;
}