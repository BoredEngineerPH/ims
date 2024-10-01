'use server'
import axios from 'axios';
import FormData from 'form-data';

// Types
import {
    NewPasswordFormData
} from '@/types/FormData';

export async function useNewPassword(data: NewPasswordFormData) {
    try {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('token', data.token);
        formData.append('password', data.password);
        formData.append('password_confirmation', data.password_confirmation);

        const response = await axios.post(`${process.env.API_KEY_ENDPOINT || ''}/api/auth/password/reset`, formData, {
            headers: {
                'Accept': 'application/json',
                ...formData.getHeaders()
            }
        });
        return response.data;

    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            if(error?.response?.status === 400){
                throw new Error(error?.response?.data.message || "Unable to process your request at this time. Please try again later.");
            }else{
                throw new Error("Unable to process your request at this time. Please try again later.");
            }
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}
