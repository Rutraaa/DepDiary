namespace DepDiary.Models.Note;

public class NoteResponse
{
    public int NoteId { get; set; }

	public string Content { get; set; } = null!;

    public string Title { get; set; } = null!;

    public DateTime? CreateDate { get; set; }

    public DateTime? UpdateDate { get; set; }
}