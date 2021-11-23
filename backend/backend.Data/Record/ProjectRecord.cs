using FluentNHibernate.Mapping;

namespace backend.Data.Record;

public class ProjectRecord
{
    public virtual long Id { get; init; }
    public virtual Guid Reference { get; init; }
    public virtual string Title { get; set; }
    public virtual string UrlSlug { get; set; }
    public virtual DateTime StartedAt { get; set; }
    public virtual string Summary { get; set; }
    public virtual string Description { get; set; }
    public virtual string? SourceCodeUrl { get; set; }
    public virtual string? PreviewImageUrl { get; set; }
    public virtual int DisplayOrder { get; set; }
    public virtual DateTime CreatedAt { get; init; }
}

public sealed class ProjectRecordMap : ClassMap<ProjectRecord>
{
    public ProjectRecordMap()
    {
        Schema("project");
        Table("project");
        Id(x => x.Id, "id").GeneratedBy.SequenceIdentity("project_id_seq");
        Map(x => x.Reference, "reference");
        Map(x => x.Title, "title");
        Map(x => x.UrlSlug, "url_slug");
        Map(x => x.StartedAt, "started_at");
        Map(x => x.Summary, "summary");
        Map(x => x.Description, "description");
        Map(x => x.SourceCodeUrl, "source_code_url");
        Map(x => x.PreviewImageUrl, "preview_image_url");
        Map(x => x.DisplayOrder, "display_order");
        Map(x => x.CreatedAt, "created_at");
    }
}