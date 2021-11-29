import { apiClient, handleError } from '@/api/ApiClient';

import { ApiResultResponse } from '@/api/type/ApiResponse.type';
import { GetAlbumsResponse } from '@/api/client/gallery/type/GetAlbums.type';
import { GetPhotosByAlbumResponse } from '@/api/client/gallery/type/GetPhotosByAlbum.type';

class GalleryClient {

    public async getAlbums(): Promise<GetAlbumsResponse | Error> {
        try {
            const response = await apiClient.get<ApiResultResponse<GetAlbumsResponse>>('/gallery/albums');

            return response.data.result;
        }
        catch (error) {
            return handleError(error);
        }
    }

    public async getPhotosByAlbum(albumId: string): Promise<GetPhotosByAlbumResponse | Error> {
        try {
            const response = await apiClient.get<ApiResultResponse<GetPhotosByAlbumResponse>>(`/gallery/album/${albumId}/photos`);

            return response.data.result;
        }
        catch (error) {
            return handleError(error);
        }
    }
}

export const galleryClient = new GalleryClient();