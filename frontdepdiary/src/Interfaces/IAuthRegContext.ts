export interface LoginRequest {
    email: string;
    password: string;
};

export interface RegistrationRequest {
    username: '';
    email: string;
    password: string;
}

export interface UserContext {
    userId: number;
    token: string;
}