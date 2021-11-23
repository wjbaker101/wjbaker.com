using FluentNHibernate.Mapping;

namespace backend.Data.Record;

public class BlogPostRecord
{
    public virtual long Id { get; init; }
    public virtual Guid Reference { get; init; }
    public virtual string Title { get; set; }
    public virtual string UrlSlug { get; set; }
    public virtual DateTime PostedAt { get; init; }
    public virtual string Summary { get; set; }
    public virtual string Content { get; set; }
}

public sealed class BlogPostRecordMap : ClassMap<BlogPostRecord>
{
    public BlogPostRecordMap()
    {
        Schema("blog");
        Table("post");
        Id(x => x.Id, "id").GeneratedBy.SequenceIdentity("post_id_seq");
        Map(x => x.Reference, "reference");
        Map(x => x.Title, "title");
        Map(x => x.UrlSlug, "url_slug");
        Map(x => x.PostedAt, "posted_at");
        Map(x => x.Summary, "summary");
        Map(x => x.Content, "content");
    }
}