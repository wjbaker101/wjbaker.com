export interface GetPhotosByAlbumResponse {
    total: number;
    pageSize: number;
    albums: Array<Photo>;
}

interface Photo {
    id: string;
    title: string;
    takenAt: string;
    latitude: number;
    longitude: number;
}