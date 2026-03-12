import axios from "axios";
import type { AuthenticationRequest, AuthenticationResponse } from "../types";

export const authApi = {
    login: async (data: AuthenticationRequest): Promise<AuthenticationResponse> =>{
        const url = '/auth/login';
        return axios.post(url, data);
    },
    logout: () =>{
        localStorage.removeItem('token');
        window.location.href ='/login';
    }
}