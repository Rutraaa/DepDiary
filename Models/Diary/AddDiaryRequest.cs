using DepDiary.Entities;

namespace DepDiary.Models.Diary
{
    public class AddDiaryRequest
    {
        public int UserId { get; set; }

        public string DiaryName { get; set; } = null!;
    }
}
