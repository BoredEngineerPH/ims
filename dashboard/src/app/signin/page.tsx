import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Blank from "@/components/Layouts/Blank";
import {Auth} from '@/components/Branding/Auth';

import SignInForm from '@/form/SignInForm';

export const metadata: Metadata = {
    title: `Sign in | ${process.env.APP_NAME}`,
};

const SignIn: React.FC = () => {
    return (
        <Blank>
            <div className="flex items-center justify-center w-full">
                <div className="p-5 w-full h-full overflow-auto max-w-[600px] lg:max-w-[1200px]">
                    <div className="m-auto rounded-xl border border-stroke bg-white shadow-default dark:shadow-none dark:border-strokedark dark:bg-boxdark">
                        <div className="flex">
                            <div className="hidden w-full xl:block xl:w-1/2">
                                <Auth />
                            </div>

                            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                                <div className="w-full p-10 xl:p-17">
                                    <h2 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                        Sign In to {process.env.APP_NAME}
                                    </h2>
                                    <SignInForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Blank>
    );
};

export default SignIn;
