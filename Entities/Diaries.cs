﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace DepDiary.Entities;

public partial class Diaries
{
    public int DiaryId { get; set; }

    public int UserId { get; set; }

    public string DiaryName { get; set; }

    public DateTime? UpdateDate { get; set; }

    public DateTime? CreateDate { get; set; }

    public virtual ICollection<Notes> Notes { get; set; } = new List<Notes>();

    public virtual Users User { get; set; }
}