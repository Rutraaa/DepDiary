namespace DepDiary.Models.Note;

public class AddNoteRequest
{
    public int DiaryId { get; set; }

    public string Content { get; set; } = null!;

    public string Title { get; set; } = null!;
}