export interface AuthenticationRequest{
    username: string;
    password: string;
}
export interface AuthenticationResponse{
    token: string;
    authenticated: boolean;
}
export interface UserResponse {
    id: string;
    username: string;
    fullName: string;
    email: string;
    active: boolean;
    roles: string[]; // Set<String> tương ứng string[]
}
export interface UserCreationRequest{
    username: string;
    password: string;
    fullName: string;
    email: string;
}