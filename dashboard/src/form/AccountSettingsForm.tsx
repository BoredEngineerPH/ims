"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

import { useRecoilState } from 'recoil';
import { notificationState, NotificationType } from '@/state/notification';




import { useForm, SubmitHandler } from "react-hook-form";
import nookies from 'nookies';

// Utils
import { useAddNotification } from '@/hooks/useAddNotification';


// Components
import Input from '@/components/FormElements/Input';
import {
    PasswordOn,
    PasswordOff,
    Edit,
} from '@/components/Icons/UI';

import SmallLoader from '@/components/Common/Loader/Small';
import Button from '@/components/FormElements/Button';
import Alert from '@/components/Alert';
import Checkbox from '@/components/Checkboxes';

// Actions
import { useUpdateAccount } from '@/hooks/useUpdateAccount';
import { useGetAccount } from '@/hooks/useGetAccount';

// Types
import { AccountSettingsFormData } from '@/types/FormData';

// Validation
import {
    EmailInputRule,
    PasswordInputRuleNotRequired,
    RequiredInputRule
} from '@/validation/FormValidation';


export default function AccountSettingsForm() {
    const [showPassword1, toggleShowPassword1] = useState<boolean>(false);
    const [showPassword2, toggleShowPassword2] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [apiToken, setToken] = useState<string>('');
    const { register, handleSubmit, setValue, setError, watch, formState: { errors } } = useForm<AccountSettingsFormData>();
    const addNotification = useAddNotification();


    const router = useRouter();
    const hasPageBeenRendered = useRef(false);

    const onSubmit: SubmitHandler<AccountSettingsFormData> = async (data) => {
        setIsProcessing(true);
        try {
            const response = await useUpdateAccount(apiToken, {
                id: data.id,
                first_name: data.first_name,
                middle_name: data.middle_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password,
                confirm_password: data.confirm_password,
                meta: data.meta
            });
            setIsProcessing(false);
        } catch (error) {
            const newNotification = null;
            if (error instanceof Error) {
                setTimeout(()=> {
                    addNotification('error', error.message);
                    setIsProcessing(false);
                }, 2000);
            } else {
                setTimeout(()=> {
                    addNotification('error', 'An unexpected error occurred.');
                    setIsProcessing(false);
                }, 2000);
            }
        }
    };

    const getUserData= async (token: string) => {
        setIsProcessing(true);
        try {
            const response = await useGetAccount(token);
            const user = response.data;
            setValue('id', user.id);
            setValue('first_name', user.first_name);
            setValue('middle_name', user.middle_name);
            setValue('last_name', user.last_name);
            setValue('email', user.email);
            setValue('meta.mobile', user.meta.mobile);
            setValue('meta.bio', user.meta.bio);
            setIsProcessing(false);
        } catch (error) {
            if (error instanceof Error) {
                setTimeout(()=> {
                    addNotification('error', error.message);
                    setIsProcessing(false);
                }, 2000);
            } else {
                setTimeout(()=> {
                    addNotification('error', 'An unexpected error occurred.');
                    setIsProcessing(false);
                }, 2000);
            }
        }
    };

    useEffect(() => {
        if (hasPageBeenRendered.current === false) {
            const cookies = nookies.get(null);
            if (cookies.token === undefined) {
                router.push('/signin');
            }else{
                setToken(cookies.token);
                getUserData(cookies.token);
            }
            hasPageBeenRendered.current = true;
        }
    }, [hasPageBeenRendered, getUserData, setToken]);

    return (
        <>
        <div className="grid grid-cols-4 gap-8 h-screen">
            <div className="col-span-5 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:shadow-none dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">Personal Information</h3>
                    </div>
                    <div className="p-7">
                        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                            <input type="hidden" {...register('id')} />
                            <div className="mb-2 flex flex-col gap-5.5 sm:flex-row w-full">
                                <Input
                                    type="text"
                                    name="first_name"
                                    label="First Name"
                                    register={register}
                                    rules={RequiredInputRule}
                                    placeholder="Enter your First Name"
                                    color={errors.first_name ? 'danger' : 'default'}
                                    helpText={errors.first_name ? <span className="text-danger">{errors.first_name.message}</span> : undefined}
                                    disabled={isProcessing}
                                    className="w-full md:w-[33.3%] text-black"
                                />
                                <Input
                                    type="text"
                                    name="middle_name"
                                    label="Middle Name"
                                    register={register}
                                    placeholder="Enter your Middle Name"
                                    color="default"
                                    disabled={isProcessing}
                                    className="w-full md:w-[33.3%]"
                                />
                                <Input
                                    type="text"
                                    name="last_name"
                                    label="Last Name"
                                    register={register}
                                    placeholder="Enter your Last Name"
                                    color="default"
                                    disabled={isProcessing}
                                    className="w-full md:w-[33.3%]"
                                />
                            </div>
                            <div className="mb-2 flex flex-col gap-5.5 sm:flex-row w-full">
                                <Input
                                    type="text"
                                    name="meta.mobile"
                                    label="Mobile Phone"
                                    register={register}
                                    placeholder="Enter your Mobile Phone"
                                    color="default"
                                    disabled={isProcessing}
                                    className="w-full"
                                />
                                <Input
                                    type="text"
                                    name="email"
                                    label="Email"
                                    className="w-full"
                                    register={register}
                                    rules={EmailInputRule}
                                    placeholder="Enter your Email"
                                    color={errors.email ? 'danger' : 'default'}
                                    helpText={errors.email ? <span className="text-danger">{errors.email.message}</span> : undefined}
                                    disabled={isProcessing}
                                />
                            </div>
                            <div className="mb-2 flex flex-col gap-5.5 sm:flex-row w-full">
                                <Input
                                    type={showPassword1 ? 'text' :'password'}
                                    name="password"
                                    label="Password"
                                    className="w-full"
                                    register={register}
                                    rules={PasswordInputRuleNotRequired}
                                    placeholder="Enter your Password"
                                    color={errors.password ? 'danger' : 'default'}
                                    icon={<button type="button" onClick={() => toggleShowPassword1(!showPassword1)}>{isProcessing === false && showPassword1 ? <PasswordOn className={`text-2xl text-${errors.password ? 'danger' : 'gray-400'}`} /> : <PasswordOff className={`text-2xl text-${errors.password ? 'danger' : 'gray-400'}`} />}</button>}
                                    helpText={errors.password ? <span className="text-danger">{errors.password.message}</span> : undefined}
                                    disabled={isProcessing}
                                />
                                <Input
                                    type={showPassword2 ? 'text' :'password'}
                                    name="confirm_password"
                                    label="Confirm Password"
                                    className="w-full"
                                    register={register}
                                    rules={{
                                        validate: (val: string) => {
                                            if (watch('password') != val) {
                                                return "Password does not match.";
                                            }
                                        },
                                    }}
                                    placeholder="Confirm your password"
                                    color={errors.confirm_password ? 'danger' : 'default'}
                                    icon={<button type="button" onClick={() => toggleShowPassword2(!showPassword2)}>{isProcessing === false && showPassword2 ? <PasswordOn className={`text-2xl text-${errors.confirm_password ? 'danger' : 'gray-400'}`} /> : <PasswordOff className={`text-2xl text-${errors.confirm_password ? 'danger' : 'gray-400'}`} />}</button>}
                                    helpText={errors.confirm_password ? <span className="text-danger">{errors.confirm_password.message}</span> : undefined}
                                    disabled={isProcessing}
                                />
                            </div>
                            <div className="mb-6">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="bio">BIO</label>
                                <div className="relative">
                                    <span className="absolute left-4.5 top-4"><Edit className="text-2xl" /></span>
                                    <textarea
                                        className="w-full rounded border border-stroke bg-gray py-3 pl-14 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        id="bio"
                                        rows={6}
                                        placeholder="Write your bio here"
                                        disabled={isProcessing}
                                        {...register('meta.bio')}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4.5">
                                <Button
                                    color="primary"
                                    type="submit"
                                    className="flex justify-center rounded-full w-40 bg-primary font-medium text-gray hover:bg-opacity-90"
                                    disabled={isProcessing}
                                >
                                    {isProcessing ?
                                        <><span className="mr-2"><SmallLoader /></span> Saving...</>
                                        : <>Save</>
                                    }
                                </Button>
                                {/* <button
                                className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                type="submit"
                                >
                                Cancel
                                </button>
                                <button
                                className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                                type="submit"
                                >
                                Save
                                </button> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        </>
    );
};
