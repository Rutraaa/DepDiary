using DepDiary.Entities;
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
    public class NoteController : ControllerBase
    {
        private readonly DepDiaryContext _depDiary;
        private readonly DbSet<Notes> _notesContext;

        public NoteController(DepDiaryContext depDiary)
        {
            _depDiary = depDiary;
            _notesContext = _depDiary.Notes;
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetNotesList()
        {
            var notesList = await _notesContext.AsNoTracking().ToListAsync();

            return Ok(notesList);
        }

        [HttpGet]
        [Route("{noteId}")]
        public async Task<IActionResult> GetNotesById(int noteId)
        {
            var noteResponse = await _notesContext.FirstOrDefaultAsync(x => x.NoteId == noteId);

            var note = new NoteResponse
            {
                Content = noteResponse.Content,
                Title = noteResponse.Title,
                CreateDate = noteResponse.CreateDate,
                UpdateDate = noteResponse.UpdateDate
            };

            if (note == null)
                return NotFound("Note not found");

            return Ok(note);
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateNote(AddNoteRequest addNoteRequest)
        {
            var note = new Notes
            {
                DiaryId = addNoteRequest.DiaryId,
                Content = addNoteRequest.Content,
                CreateDate = DateTime.Now,
                Title = addNoteRequest.Title,
                UpdateDate = DateTime.Now
            };

            await _notesContext.AddRangeAsync(note);
            await _depDiary.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        [Route("update/{noteId}")]
        public async Task<IActionResult> UpdateNote(int noteId, UpdateNoteRequest updateNoteRequest)
        {
            var note = await _notesContext.FindAsync(noteId);

            if (note == null)
                return NotFound("Note not found");

            note.Title = updateNoteRequest.Title;
            note.Content = updateNoteRequest.Content;
            note.UpdateDate = DateTime.Now;

            await _depDiary.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [Route("delete/{noteId}")]
        public async Task<IActionResult> DeleteNote(int noteId)
        {
            var note = await _notesContext.FindAsync(noteId);

            if (note == null)
                return NotFound("Note not found");

            _notesContext.Remove(note);
            await _depDiary.SaveChangesAsync();

            return Ok();
        }
    }

}