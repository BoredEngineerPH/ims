'use server'
import axios from 'axios';
import FormData from 'form-data';

import {
    AccountSettingsFormData
} from '@/types/FormData';

export async function useUpdateAccount(token: string, data: AccountSettingsFormData) {
    try {
        console.log(data);
        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('middle_name', data.middle_name);
        formData.append('last_name', data.last_name);
        formData.append('email', data.email);

        if(data.password !==''){
            formData.append('password', data.password);
            formData.append('confirm_password', data.confirm_password);
        }

        formData.append('meta', data.meta);

        const response = await axios.post(`${process.env.API_KEY_ENDPOINT || ''}/api/users/${data.id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                ...formData.getHeaders()
            }
        });
        return response.data;

    } catch (error) {
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
