import axios, { AxiosError } from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9000/api',
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {           
            console.error('Error response:', error.response.data);
        } else if (error.request) {           
            console.error('No response received:', error.request);
        } else {           
            console.error('Error setting up the request:', error.message);
        }      
        return Promise.reject(error);
    }
);

export async function get<T>(url: string): Promise<T> {
    const response = await api.get<T>(url);
    return response.data;
}