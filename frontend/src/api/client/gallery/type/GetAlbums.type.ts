export interface GetAlbumsResponse {
    total: number;
    pageSize: number;
    albums: Array<Album>;
}

interface Album {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    photoCount: number;
    coverPhoto: CoverPhoto;
}

interface CoverPhoto {
    latitude: number;
    longitude: number;
    imageUrl: string;
}