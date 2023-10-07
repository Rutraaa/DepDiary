namespace DepDiary.Models.User;

public class UpdateUserRequest
{
    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;
}