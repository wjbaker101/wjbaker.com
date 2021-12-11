import { Dayjs } from 'dayjs';

export interface Album {
    id: string;
    title: string;
    description: string;
    createdAt: Dayjs;
    photoCount: number;
    coverPhoto: CoverPhoto;
}

interface CoverPhoto {
    latitude: number;
    longitude: number;
    imageUrl: string;
}