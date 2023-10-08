namespace DepDiary.Models.Diary;

public class DiaryResponse
{
    public string DiaryName { get; set; } = null!;

    public DateTime? UpdateDate { get; set; }

    public DateTime? CreateDate { get; set; }
}