﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using DepDiary.Models.Configurations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
#nullable disable

namespace DepDiary.Models;

public partial class DepDiaryContext : DbContext
{
    public DepDiaryContext(DbContextOptions<DepDiaryContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Diaries> Diaries { get; set; }

    public virtual DbSet<Notes> Notes { get; set; }

    public virtual DbSet<Users> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new Configurations.DiariesConfiguration());
        modelBuilder.ApplyConfiguration(new Configurations.NotesConfiguration());
        modelBuilder.ApplyConfiguration(new Configurations.UsersConfiguration());

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}