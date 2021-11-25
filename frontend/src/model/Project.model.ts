import { Dayjs } from 'dayjs';

export interface Project {
    reference: string;
    title: string;
    urlSlug: string;
    startedAt: Dayjs;
    summary: string;
    sourceCodeUrl: string | null;
    previewImageUrl: string | null;
    displayOrder: number;
    createdAt: Dayjs;
    viewUrl: string | null;
}