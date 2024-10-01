'use server'
import axios from 'axios';
import FormData from 'form-data';

// Types
import {
    SignUpFormData,
} from '@/types/FormData';

export async function useSignUpUser(data: SignUpFormData) {
    try {
        const formData = new FormData();
        formData.append('first_name', data.email);
        formData.append('last_name', data.last_name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('confirm_password', data.confirm_password);

        const response = await axios.post(`${process.env.API_KEY_ENDPOINT || ''}/api/auth/register`, formData, {
            headers: {
                'Accept': 'application/json',
                ...formData.getHeaders()
            }
        });
        return response.data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error("Unable to process your request at this time. Please try again later.");
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}
