﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace DepDiary.Entities;

public partial class Notes
{
    public int NoteId { get; set; }

    public int DiaryId { get; set; }

    public string Content { get; set; }

    public DateTime? CreateDate { get; set; }

    public string Title { get; set; }

    public DateTime? UpdateDate { get; set; }

    public virtual Diaries Diary { get; set; }
}