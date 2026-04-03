import type { AuthenticationRequest, AuthenticationResponse, UserCreationRequest, UserResponse } from '../types/auth';
import axiosClient from './axiosClient';

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
        localStorage.removeItem('userRole');
        window.location.href ='/login';
    },
    register: async (data: UserCreationRequest): Promise<UserResponse> => {
        return axiosClient.post('/users', data); 
    }
}