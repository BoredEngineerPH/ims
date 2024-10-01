'use server'
import axios from 'axios';
import FormData from 'form-data';

export async function useGetAccount(token: string) {
    try {
        const response = await axios.get(`${process.env.API_KEY_ENDPOINT || ''}/api/current-user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message);
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}
