'use server'
import axios from 'axios';
import FormData from 'form-data';

import {
    ForgotPasswordFormData
} from '@/types/FormData';

export async function useResendActivation(data: ForgotPasswordFormData) {
    try {
        const formData = new FormData();
        formData.append('email', data.email);

        const response = await axios.post(`${process.env.API_KEY_ENDPOINT || ''}/api/auth/email/verification-resend`, formData, {
            headers: {
                'Accept': 'application/json',
                ...formData.getHeaders()
            }
        });
        return response.data;

    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404 || error.response?.status === 400) {
                throw new Error(error.response?.data?.message);
            } else {
                throw new Error("Unable to process your request at this time. Please try again later.");
            }
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}
