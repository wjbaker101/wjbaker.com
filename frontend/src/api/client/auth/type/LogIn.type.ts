export interface LogInRequest {
    username: string;
    password: string;
}

export interface LogInResponse {
    jwt: string;
    user: UserDetails;
}

interface UserDetails {
    reference: string;
    userType: number;
}