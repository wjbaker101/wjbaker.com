using backend.Core.Client.Flickr;

namespace backend.Api.Gallery;

public interface IGalleryService
{
}

public sealed class GalleryService : IGalleryService
{
    private readonly IFlickrClient _flickrClient;

    public GalleryService(IFlickrClient flickrClient)
    {
        _flickrClient = flickrClient;
    }
}