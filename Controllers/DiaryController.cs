using DepDiary.Entities;
using DepDiary.Models.Diary;
using DepDiary.Models.Note;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace DepDiary.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class DiaryController : Controller
    {
        private readonly DepDiaryContext _depDiary;
        private readonly DbSet<Diaries> _diariesContext;
        private readonly DbSet<Notes> _notesContext;

        public DiaryController(DepDiaryContext depDiary)
        {
            _depDiary = depDiary;
            _diariesContext = _depDiary.Diaries;
            _notesContext = _depDiary.Notes;
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetDiariesList()
        {
            var diariesList = await _diariesContext.AsNoTracking().ToListAsync();

            return Ok(diariesList);
        }

        [HttpGet]
        [Route("{diaryId}")]
        public async Task<IActionResult> GetDiaryById(int diaryId)
        {
            var diary = await _diariesContext.FirstOrDefaultAsync(x => x.DiaryId == diaryId);

            if (diary == null)
                return NotFound("Dairy not found");

            return Ok(diary);
        }

        [HttpGet]
        [Route("userDiariesList/{userId}")]
        public async Task<IActionResult> GetDiariesForUser(int userId)
        {
            var userDiariesEntities = await _diariesContext.Where(item => item.UserId == userId).ToListAsync();

            List<DiaryResponse> userDiaries = userDiariesEntities.Select( entity => new DiaryResponse
            {
                DiaryId = entity.DiaryId,
                CreateDate = entity.CreateDate,
                UpdateDate = entity.UpdateDate,
                DiaryName = entity.DiaryName
            }).ToList();

            return Ok(userDiaries);
        }

        [HttpGet]
        [Route("notePerDiary/{diaryId}")]
        public async Task<IActionResult> GetNotesForDiary(int diaryId)
        {
            var noteListEntities = await _notesContext.Where(item => item.DiaryId == diaryId).ToListAsync();

            List<NoteResponse> noteList = noteListEntities.Select(entity => new NoteResponse
            {
                NoteId =entity.NoteId, 
                Content = entity.Content,
                Title = entity.Title,
                CreateDate = entity.CreateDate,
                UpdateDate = entity.UpdateDate
            }).ToList();

            return Ok(noteList);
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateDiary(AddDiaryRequest addDiaryRequest)
        {
            var diary = new Diaries
            {
                UserId = addDiaryRequest.UserId,
                DiaryName = addDiaryRequest.DiaryName,
                UpdateDate = DateTime.Now,
                CreateDate = DateTime.Now
            };

            await _diariesContext.AddRangeAsync(diary);
            await _depDiary.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        [Route("update/{diaryId}")]
        public async Task<IActionResult> UpdateDiary(int diaryId, UpdateDiaryRequest updateDiaryRequest)
        {
            var diary = await _diariesContext.FindAsync(diaryId);

            if (diary == null)
                return NotFound("Diary not found");

            diary.DiaryName = updateDiaryRequest.DiaryName;
            diary.UpdateDate = DateTime.Now;

            await _depDiary.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [Route("delete/{diaryId}")]
        public async Task<IActionResult> DeleteDiary(int diaryId)
        {
            var diary = await _diariesContext.FindAsync(diaryId);
            if (diary == null)
                return NotFound("Diary not found");

            _diariesContext.Remove(diary);
            await _depDiary.SaveChangesAsync();

            return Ok();
        }
    }

}