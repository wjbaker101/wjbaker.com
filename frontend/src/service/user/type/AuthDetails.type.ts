import { UserType } from '@/model/User.model';

export interface AuthDetails {
    jwt: string;
    expiresAt: number;
    user: UserDetails;
}

export interface UserDetails {
    reference: string;
    userType: UserType;
}