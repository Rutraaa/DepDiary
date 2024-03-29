﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using DepDiary.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;

namespace DepDiary.Entities.Configurations
{
    public partial class DiariesConfiguration : IEntityTypeConfiguration<Diaries>
    {
        public void Configure(EntityTypeBuilder<Diaries> entity)
        {
            entity.HasKey(e => e.DiaryId).HasName("PK__Diaries__267B56F4BE26D29F");

            entity.Property(e => e.CreateDate).HasColumnType("datetime");
            entity.Property(e => e.DiaryName).HasMaxLength(255);
            entity.Property(e => e.UpdateDate).HasColumnType("datetime");

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<Diaries> entity);
    }
}
