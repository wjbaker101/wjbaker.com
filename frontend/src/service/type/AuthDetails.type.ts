import { UserType } from '@/model/User.model';

export interface AuthDetails {
    jwt: string;
    user: UserDetails;
}

interface UserDetails {
    reference: string;
    userType: UserType;
}