import { UserType } from '@/model/User.model';

export interface AuthDetails {
    jwt: string;
    user: UserDetails;
}

export interface UserDetails {
    reference: string;
    userType: UserType;
}