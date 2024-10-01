"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";
import nookies from 'nookies';

// Components
import { FiEye, FiEyeOff } from "react-icons/fi";
import Input from '@/components/FormElements/Input';
import SmallLoader from '@/components/Common/Loader/Small';
import Button from '@/components/FormElements/Button';

// Actions
import { useNewPassword } from '@/hooks/useNewPassword';

// Types
import { NewPasswordFormData } from '@/types/FormData';

// Validation
import {
    PasswordInputRule
} from '@/validation/FormValidation';


export default function NewPasswordForm({token}: {token: string}) {
    const [showPassword1, toggleShowPassword1] = useState<boolean>(false);
    const [showPassword2, toggleShowPassword2] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<NewPasswordFormData>();
    const router = useRouter();
    const urlParams = useSearchParams();
    const email = urlParams.get('email');

    const hasPageBeenRendered = useRef(false);

    const onSubmit: SubmitHandler<NewPasswordFormData> = async (data) => {
         setIsProcessing(true);
        setFormErrorMessage(null);
        try {
            const response = await useNewPassword({
                email: data.email,
                token: data.token,
                password: data.password,
                password_confirmation: data.password_confirmation,
            });
            router.push('/signin');
        } catch (error) {
            if (error instanceof Error) {
                setTimeout(()=> {
                    setFormErrorMessage(error.message);
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
            <input type="hidden" defaultValue={email || ''} {...register('email')} readOnly={true} />
            <input type="hidden" defaultValue={token || ''} {...register('token')} readOnly={true} />
            <Input
                type={showPassword1 ? 'text' :'password'}
                name="password"
                label="Password"
                className="mb-3"
                register={register}
                rules={PasswordInputRule}
                placeholder="Enter your Password"
                color={errors.password ? 'danger' : 'default'}
                icon={<button type="button" onClick={() => toggleShowPassword1(!showPassword1)}>{showPassword1 ? <FiEye className={`text-2xl text-${errors.password ? 'danger' : 'gray-400'}`} /> : <FiEyeOff className={`text-2xl text-${errors.password ? 'danger' : 'gray-400'}`} />}</button>}
                helpText={errors.password ? <span className="text-danger">{errors.password.message}</span> : undefined}
                disabled={isProcessing}
            />
            <Input
                type={showPassword2 ? 'text' :'password'}
                name="password_confirmation"
                label="Confirm Password"
                className="mb-10"
                register={register}
                rules={{
                    required: "This field is required",
                    validate: (val: string) => {
                        if (watch('password') != val) {
                            return "Password does not match.";
                        }
                    },
                }}
                placeholder="Confirm your password"
                color={errors.password_confirmation ? 'danger' : 'default'}
                icon={<button type="button" onClick={() => toggleShowPassword2(!showPassword2)}>{showPassword2 ? <FiEye className={`text-2xl text-${errors.password_confirmation ? 'danger' : 'gray-400'}`} /> : <FiEyeOff className={`text-2xl text-${errors.password_confirmation ? 'danger' : 'gray-400'}`} />}</button>}
                helpText={errors.password_confirmation ? <span className="text-danger">{errors.password_confirmation.message}</span> : undefined}
                disabled={isProcessing}
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
