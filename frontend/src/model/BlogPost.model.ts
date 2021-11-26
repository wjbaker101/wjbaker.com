import { Dayjs } from 'dayjs';

export interface BlogPost {
    reference: string;
    title: string;
    urlSlug: string;
    postedAt: Dayjs;
    summary: string;
    content: string | null;
}