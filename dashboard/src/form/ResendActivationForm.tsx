"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";
import { setCookie } from 'nookies';
import nookies from 'nookies';

// Components
import { FiMail, FiEye, FiEyeOff } from "react-icons/fi";
import Input from '@/components/FormElements/Input';
import SmallLoader from '@/components/Common/Loader/Small';
import Button from '@/components/FormElements/Button';

// Actions
import { useResendActivation } from '@/hooks/useResendActivation';

// Types
import { ForgotPasswordFormData } from '@/types/FormData';

// Validation
import {
    EmailInputRule
} from '@/validation/FormValidation';


export default function ResendActivationForm() {
    const [showPassword, toggleShowPassword] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
    const { register, handleSubmit, setError, formState: { errors } } = useForm<ForgotPasswordFormData>();
    const router = useRouter();
    const hasPageBeenRendered = useRef(false);

    const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
        setIsProcessing(true);
        setFormErrorMessage(null);
        try {
            const response = await useResendActivation({
                email: data.email
            });
            router.push('/signin');
        } catch (error) {
            if (error instanceof Error) {
                setTimeout(()=> {
                    setError('email', {
                        type: 'custom',
                        message: error.message
                    })
                    setIsProcessing(false);
                }, 2000);
            } else {
                setTimeout(()=> {
                    setFormErrorMessage("Unable to process your request at this time. Please try again later.");
                    setIsProcessing(false);
                }, 2000);
            }
        }
    };

    useEffect(() => {
        if (hasPageBeenRendered.current === false) {
            const cookies = nookies.get(null);
            hasPageBeenRendered.current = true;
            if (cookies.token !== undefined) {
                router.push('/');
            }
        }
    }, [hasPageBeenRendered]);

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Input
                type="text"
                name="email"
                label="Email"
                register={register}
                rules={EmailInputRule}
                placeholder="Enter your email"
                color={errors.email ? 'danger' : 'default'}
                icon={<FiMail className={`text-2xl ${errors.email ? 'text-danger' : 'text-gray-400 '}`} />}
                helpText={errors.email ? <span className="text-danger">{errors.email.message}</span> : undefined}
                disabled={isProcessing}
                className="mb-8"
            />
            <div className="mb-5">
                <Button
                    type="submit"
                    color="primary"
                    className="rounded-full w-full"
                    disabled={isProcessing}
                >
                    {isProcessing ?
                        <><span className="mr-2"><SmallLoader /></span> Loading...</>
                        : <>Submit</>
                    }
                </Button>
            </div>
            <div className="mt-6 text-center">
                <p>Don't have any account?{" "} <Link href="/signup" className="text-primary hover:underline">Sign Up</Link></p>
            </div>
        </form>
        </>
    );
};
