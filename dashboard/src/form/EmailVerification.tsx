"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import nookies from 'nookies';

// Action
import {useVerifyEmail} from '@/hooks/useVerifyEmail';

// Components
import Loader from "@/components/Common/Loader";
import Button from '@/components/FormElements/Button';

export default function EmailVerification({id, hash} : {id: string, hash: string}) {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [responseData, setResponseData] = useState({
        success: false,
        message: ''
    });
    const hasPageBeenRendered = useRef(false);
    const router = useRouter();

    const verifyEmail = async () => {
        setIsProcessing(true);
        try {
            const response = await useVerifyEmail({
                'id': id,
                'hash': hash
            });
            setResponseData({
                success: true,
                message: 'Awesome!! Your email had been verified you can now sign-in.'
            });
        } catch (error) {
            setResponseData({
                success: false,
                message: 'Unable to process request. Please try again later.'
            });
        }
        setIsProcessing(false);
    };

    useEffect(() => {
        if (hasPageBeenRendered.current === false) {
            const cookies = nookies.get(null);
            console.log(cookies);

            if (cookies.token !== undefined) {
                router.push('/');
            }else{
                verifyEmail();
            }

            hasPageBeenRendered.current = true;
        }
    }, [hasPageBeenRendered, verifyEmail]);
    return (
        <>
            {isProcessing ?
                <div className="flex justify-center">
                    <Loader />
                </div>
            :
                <>
                    <div className="flex justify-center">
                        <p className="mb-6">{responseData.message}</p>
                    </div>
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            color="primary"
                            className="rounded-full"
                            onClick={() => router.replace('/signin')}
                        >
                            Back to Sign In
                        </Button>
                    </div>
                </>
            }
        </>
    );
};
