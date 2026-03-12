import axiosClient from './axiosClient';
import type { AuthenticationRequest, AuthenticationResponse, UserResponse } from "../types";

export const authApi = {
    login: async (data: AuthenticationRequest): Promise<AuthenticationResponse> => {
        const url = '/auth/login';
        return axiosClient.post(url, data); 
    },
    getMyInfo: async (): Promise<UserResponse> => {
        return axiosClient.get('/auth/me');
    },
    logout: () =>{
        localStorage.removeItem('token');
        window.location.href ='/login';
    }
}