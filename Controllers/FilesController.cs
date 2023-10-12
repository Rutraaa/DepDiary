using DepDiary.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using static System.Net.WebRequestMethods;

namespace DepDiary.Controllers
{
    [Route("[controller]")]
    [ApiController]
    //[Authorize]
    public class FilesController : ControllerBase
    {
        private readonly DepDiaryContext _depDiary;
        private readonly DbSet<Notes> _notesContext;
        private readonly DbSet<Diaries> _diariesContext;
        private readonly DbSet<Users> _usersContext;

        public FilesController(DepDiaryContext depDiary)
        {
            _depDiary = depDiary;
            _notesContext = _depDiary.Notes;
            _usersContext = _depDiary.Users;
            _diariesContext = _depDiary.Diaries;
        }

        [HttpGet]
        [Route("getFile/{userId}/{diaryId}/{noteId}")]
        public IActionResult GetFile(int userId, int diaryId, int noteId, string fileType)
        {
            string basePath = GetFolderPath(userId, diaryId, noteId);

            var fileName = Directory.GetFiles(basePath).First();

            var file = System.IO.File.ReadAllBytes(fileName);

            return File(file, "image/jpeg", "fileName");

        }

        [HttpPost]
        [Route("uploadFile/{userId}/{diaryId}/{noteId}")]
        public IActionResult SendFileAndSave(IFormFile file, int userId, int diaryId, int noteId)
        {
            CheckOrCreateFolders(userId, diaryId, noteId);

            if (file == null || file.Length == 0)
            {
                return Ok();
            }

            var basePath = GetFolderPath(userId, diaryId, noteId);

            var filePath = Path.Combine(basePath, Path.GetFileName(file.FileName));

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return Ok();
        }

        [HttpDelete]
        [Route("deleteFile/{userId}/{diaryId}/{noteId}/{fileType}")]
        public IActionResult SendFileAndSave(int userId, int diaryId, int noteId, string fileType)
        {
            string basePath = GetFolderPath(userId, diaryId, noteId);

            var deleteFile = Directory.GetFiles(basePath).First();

            System.IO.File.Delete(deleteFile);

            return Ok();
        }


        private static void CheckOrCreateFolders(int userId, int diaryId, int noteId)
        {
            string baseFolderPath = @"C:\Users\Lenovo\Desktop\DepDiary\DepDiary\Memory";

            string[] folderNames = { userId.ToString(), diaryId.ToString(), noteId.ToString() };

            string currentPath = baseFolderPath;
            foreach (string folderName in folderNames)
            {
                currentPath = Path.Combine(currentPath, folderName);
                if (!Directory.Exists(currentPath))
                {
                    Directory.CreateDirectory(currentPath);
                }
            }
        }

        private string GetFolderPath(int userId, int diaryId, int noteId)
        {
            string baseFolderPath = @"C:\Users\Lenovo\Desktop\DepDiary\DepDiary\Memory";

            string[] folderNames = { userId.ToString(), diaryId.ToString(), noteId.ToString() };

            return Path.Combine(baseFolderPath, Path.Combine(folderNames));
        }
    }
}
