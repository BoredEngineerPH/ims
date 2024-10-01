import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Blank from "@/components/Layouts/Blank";

import ForgotPasswordForm from '@/form/ForgotPasswordForm';

export const metadata: Metadata = {
    title: `Forgot Password | ${process.env.APP_NAME}`,
};

const SignIn: React.FC = () => {
    return (
        <Blank>
            <div className="flex items-center justify-center w-full">
                <div className="p-5 w-full h-full overflow-auto max-w-[600px]">
                    <div className="m-auto rounded-xl border border-stroke bg-white shadow-default dark:shadow-none dark:border-strokedark dark:bg-boxdark">
                        <div className="w-full p-10 xl:p-17">
                            <h2 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                Forgot your Password
                            </h2>
                            <p className="mb-6">Enter your email so we can send you the password reset link.</p>
                            <ForgotPasswordForm />
                        </div>
                    </div>
                </div>
            </div>
        </Blank>
    );
};

export default SignIn;
