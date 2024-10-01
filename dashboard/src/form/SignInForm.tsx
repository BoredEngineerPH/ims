"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";
import { setCookie } from 'nookies';
import nookies from 'nookies';

// Components
import { FiMail, FiEye, FiEyeOff, FiSmile } from "react-icons/fi";
import Input from '@/components/FormElements/Input';
import SmallLoader from '@/components/Common/Loader/Small';
import Button from '@/components/FormElements/Button';
import Alert from '@/components/Alert';



// Actions
import { useSignInUser } from '@/hooks/useSignInUser';

// Types
import { SignInFormData } from '@/types/FormData';

// Validation
import {
    EmailInputRule,
    PasswordInputRule
} from '@/validation/FormValidation';


export default function SignInForm() {
    const [showPassword, toggleShowPassword] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();

    const router = useRouter();
    const hasPageBeenRendered = useRef(false);

    const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
        setIsProcessing(true);
        setFormErrorMessage(null);
        try {
            const response = await useSignInUser({
                email: data.email,
                password: data.password,
            });
            // let expires_in = 24 * 60 * 60; // 24 hours
            // if (data.remember) {
            //     expires_in = 7 * 24 * 60 * 60; // 7 days
            // }
            const expires_in = 60 * 60;
            setCookie(null, 'token', response.data.access_token, {
                maxAge: expires_in,
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            });
            router.replace('/');
        } catch (error) {
            if (error instanceof Error) {
                setTimeout(()=> {
                    setFormErrorMessage(error.message);
                    setIsProcessing(false);
                }, 2000);
            } else {
                setTimeout(()=> {
                    setFormErrorMessage("An unexpected error occurred.");
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
                icon={<FiMail className="text-2xl text-gray-400" />}
                helpText={errors.email ? <span className="text-danger">{errors.email.message}</span> : undefined}
                disabled={isProcessing}
                className="mb-4"
            />
            <Input
                type={showPassword ? 'text' :'password'}
                name="password"
                label="Password"
                register={register}
                rules={PasswordInputRule}
                placeholder="Enter your Password"
                color={errors.email ? 'danger' : 'default'}
                icon={<button type="button" onClick={() => toggleShowPassword(!showPassword)}>{showPassword ? <FiEye className="text-2xl text-gray-400" /> : <FiEyeOff className="text-2xl text-gray-400" />}</button>}
                helpText={errors.password ? <span className="text-danger">{errors.password.message}</span> : undefined}
                disabled={isProcessing}
                className="mb-4"
            />
            <div className="flex items-center justify-between mb-6">
                <div></div>
                <div className="forgot-password">
                    <Link href="/forgot-password" className="text-primary hover:underline">Forgot Password</Link>
                </div>
            </div>
            {formErrorMessage && <Alert color="danger" className="mb-6">{formErrorMessage}</Alert>}
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
