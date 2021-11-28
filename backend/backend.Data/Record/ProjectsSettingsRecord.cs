using backend.Data.Type;
using FluentNHibernate.Mapping;

namespace backend.Data.Record;

public class ProjectsSettingsRecord
{
    public virtual long Id { get; init; }
    public virtual List<Guid> DisplayOrder { get; set; }
}

public sealed class ProjectsSettingsRecordMap : ClassMap<ProjectsSettingsRecord>
{
    public ProjectsSettingsRecordMap()
    {
        Schema("project");
        Table("settings");
        Id(x => x.Id, "id").GeneratedBy.SequenceIdentity("settings_id_seq");
        Map(x => x.DisplayOrder, "display_order").CustomType<JsonBlob<List<Guid>>>();
    }
}