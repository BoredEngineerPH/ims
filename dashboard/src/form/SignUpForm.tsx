"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";
import nookies from 'nookies';



// Components
import Input from '@/components/FormElements/Input';
import { FiEye, FiEyeOff } from "react-icons/fi";
import SmallLoader from '@/components/Common/Loader/Small';
import Button from '@/components/FormElements/Button';
import Alert from '@/components/Alert';
import Checkbox from '@/components/Checkboxes';

// Actions
import { useSignUpUser } from '@/hooks/useSignUpUser';

// Types
import { SignUpFormData } from '@/types/FormData';

// Validation
import {
    EmailInputRule,
    PasswordInputRule,
    RequiredInputRule
} from '@/validation/FormValidation';


export default function SignInForm() {
    const [showPassword1, toggleShowPassword1] = useState<boolean>(false);
    const [showPassword2, toggleShowPassword2] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
    const { register, handleSubmit, setError, watch, formState: { errors } } = useForm<SignUpFormData>();
    const router = useRouter();
    const hasPageBeenRendered = useRef(false);

    const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
        setIsProcessing(true);
        setFormErrorMessage(null);
        try {
            const response = await useSignUpUser({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password,
                confirm_password: data.confirm_password,
                agree: data.agree
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
            <div className="flex">
                <div className="w-1/2 pr-2.5">
                    <div className="flex mb-3">
                        <Input
                            type="text"
                            name="first_name"
                            label="First Name"
                            register={register}
                            rules={RequiredInputRule}
                            placeholder="Enter your First Name"
                            className="pr-2"
                            color={errors.first_name ? 'danger' : 'default'}
                            helpText={errors.first_name ? <span className="text-danger">{errors.first_name.message}</span> : undefined}
                            disabled={isProcessing}
                        />
                        <Input
                            type="text"
                            name="last_name"
                            label="Last Name"
                            className="pl-2"
                            register={register}
                            placeholder="Enter your Last Name"
                            color="default"
                            disabled={isProcessing}
                        />
                    </div>
                    <Input
                        type="text"
                        name="email"
                        label="Email"
                        className="mb-3"
                        register={register}
                        rules={EmailInputRule}
                        placeholder="Enter your Email"
                        color={errors.email ? 'danger' : 'default'}
                        helpText={errors.email ? <span className="text-danger">{errors.email.message}</span> : undefined}
                        disabled={isProcessing}
                    />
                </div>
                <div className="w-1/2 pl-2.5">
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
                        name="confirm_password"
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
                        color={errors.confirm_password ? 'danger' : 'default'}
                        icon={<button type="button" onClick={() => toggleShowPassword2(!showPassword2)}>{showPassword2 ? <FiEye className={`text-2xl text-${errors.confirm_password ? 'danger' : 'gray-400'}`} /> : <FiEyeOff className={`text-2xl text-${errors.confirm_password ? 'danger' : 'gray-400'}`} />}</button>}
                        helpText={errors.confirm_password ? <span className="text-danger">{errors.confirm_password.message}</span> : undefined}
                        disabled={isProcessing}
                    />
                </div>
            </div>
            <div className="flex">
                <div className="w-1/2 pr-2.5">
                    <Checkbox
                        name="agree"
                        color="primary"
                        register={register}
                        rules={{
                            required: "You need to agree with the terms and condition before proceeding."
                        }}
                    >
                        I agree to<Link href="/terms" className="text-primary hover:underline ml-1">terms and conditions</Link>.
                    </Checkbox>
                    {errors.agree && <div className="pt-2 text-sm text-danger pl-6">{errors.agree.message}</div>}
                </div>
                <div className="w-1/2 pl-2.5">
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
                        <p>Already have an account?{" "} <Link href="/signin" className="text-primary hover:underline">Sign In</Link></p>
                    </div>
                </div>
            </div>
            {/* <Alert
                color="danger"
                className="mb-6"
            >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus veniam fugiat magni repellat reiciendis quia error tempora quo deserunt dolore. Et culpa odit ea, cum hic quia quod a nemo?
            </Alert> */}

        </form>
        </>
    );
};
