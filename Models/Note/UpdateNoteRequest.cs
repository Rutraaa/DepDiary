﻿namespace DepDiary.Models.Note;

public class UpdateNoteRequest
{
    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;
}