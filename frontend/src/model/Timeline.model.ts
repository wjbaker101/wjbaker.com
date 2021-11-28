import { Dayjs } from 'dayjs';

export interface Timeline {
    items: Array<TimelineItem>;
}

export interface TimelineItem {
    date: Dayjs;
    endDate: Dayjs | null;
    type: TimelineType;
    summary: string;
}

export enum TimelineType {
    None = 0,
    Education = 1,
    Work = 2,
}