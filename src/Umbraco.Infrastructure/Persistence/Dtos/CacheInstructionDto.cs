﻿using System;
using NPoco;
using Umbraco.Core.Persistence.DatabaseAnnotations;

namespace Umbraco.Core.Persistence.Dtos
{
    [TableName(Cms.Core.Constants.DatabaseSchema.Tables.CacheInstruction)]
    [PrimaryKey("id")]
    [ExplicitColumns]
    public class CacheInstructionDto
    {
        [Column("id")]
        [NullSetting(NullSetting = NullSettings.NotNull)]
        [PrimaryKeyColumn(AutoIncrement = true, Name = "PK_umbracoCacheInstruction")]
        public int Id { get; set; }

        [Column("utcStamp")]
        [NullSetting(NullSetting = NullSettings.NotNull)]
        public DateTime UtcStamp { get; set; }

        [Column("jsonInstruction")]
        [SpecialDbType(SpecialDbTypes.NTEXT)]
        [NullSetting(NullSetting = NullSettings.NotNull)]
        public string Instructions { get; set; }

        [Column("originated")]
        [NullSetting(NullSetting = NullSettings.NotNull)]
        [Length(500)]
        public string OriginIdentity { get; set; }

        [Column("instructionCount")]
        [NullSetting(NullSetting = NullSettings.NotNull)]
        [Constraint(Default = 1)]
        public int InstructionCount { get; set; }
    }
}
