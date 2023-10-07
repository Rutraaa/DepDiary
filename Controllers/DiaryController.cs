using DepDiary.Entities;
using DepDiary.Models.Diary;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DepDiary.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DiaryController : Controller
    {
        private readonly DepDiaryContext depDiary;
        private DbSet<Diaries> diariesContext;

        public DiaryController(DepDiaryContext _depDiary)
        {
            depDiary = _depDiary;
            diariesContext = depDiary.Diaries;
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetDiariesList()
        {
            var diariesList = await diariesContext.AsNoTracking().ToListAsync();

            return Ok(diariesList);
        }

        [HttpGet]
        [Route("{diaryId}")]
        public async Task<IActionResult> GetDiaryById(int diaryId)
        {
            var diary = await diariesContext.FirstOrDefaultAsync(x => x.DiaryId == diaryId);

            if (diary == null)
                return NotFound();

            return Ok(diary);
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateUser(AddDiaryRequest addDiaryRequest)
        {
            var diary = new Diaries
            {
                UserId = addDiaryRequest.UserId,
                DiaryName = addDiaryRequest.DiaryName,
                UpdateDate = DateTime.Now,
                CreateDate = DateTime.Now
            };

            await diariesContext.AddRangeAsync(diary);
            await depDiary.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        [Route("update/{diaryId}")]
        public async Task<IActionResult> UpdateUser(int diaryId, UpdateDiaryRequest updateDiaryRequest)
        {
            var diary = await diariesContext.FindAsync(diaryId);

            if (diary == null)
                return NotFound();

            diary.DiaryName = updateDiaryRequest.DiaryName;
            diary.UpdateDate = DateTime.Now;

            await depDiary.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [Route("delete/{diaryId}")]

        public async Task<IActionResult> DeleteUser(int diaryId)
        {
            var diary = await diariesContext.FindAsync(diaryId);
            if (diary == null)
                return NotFound();

            diariesContext.Remove(diary);
            await depDiary.SaveChangesAsync();

            return Ok();
        }
    }

}