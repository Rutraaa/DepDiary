using DepDiary.Entities;

namespace DepDiary.Models.Diary
{
    public class UpdateDiaryRequest
    {
        public int UserId { get; set; }

        public string DiaryName { get; set; }
    }
}
