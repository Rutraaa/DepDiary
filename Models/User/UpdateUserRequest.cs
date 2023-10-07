namespace DepDiary.Models.User;

public class UpdateUserRequest
{
    public string Username { get; set; }

    public string Password { get; set; }

    public string Email { get; set; }
}