'use server'
import axios from 'axios';
import FormData from 'form-data';

import {
    VerifyEmailFormData
} from '@/types/FormData';

export async function useVerifyEmail(data: VerifyEmailFormData) {
    try {
        console.log(data);
        const formData = new FormData();
        formData.append('id', data.id);
        formData.append('hash', data.hash);

        const response = await axios.post(`${process.env.API_KEY_ENDPOINT || ''}/api/auth/email/verify`, formData, {
            headers: {
                'Accept': 'application/json',
                ...formData.getHeaders()
            }
        });
        return response.data;

    } catch (error) {
        // console.log(error);
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 400 || error.response?.status === 409) {
                throw new Error(error.response?.data?.message);
            } else {
                throw new Error("Unable to process your request at this time. Please try again later.");
            }
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}
