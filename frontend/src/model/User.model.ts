import { Dayjs } from 'dayjs';

export interface User {
    reference: string;
    username: string;
    createdAt: Dayjs;
    type: UserType;
}

export enum UserType {
    Unknown = 0,
    Admin = 1,
    Basic = 2,
}