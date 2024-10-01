import React from "react";
import { Metadata } from "next";

// Layout
import Blank from "@/components/Layouts/Blank";
import NewPasswordForm from '@/form/NewPasswordForm';

// Components
import EmailVerification from '@/form/EmailVerification';

export const metadata: Metadata = {
    title: `New Password | ${process.env.APP_NAME}`,
};

const Page = ({ params }: { params: { token: string } }) => {
    return (
        <>
            <Blank>
                <div className="flex items-center justify-center w-full">
                    <div className="p-5 w-full h-full overflow-auto max-w-[600px]">
                        <div className="m-auto rounded-xl border border-stroke bg-white shadow-default dark:shadow-none dark:border-strokedark dark:bg-boxdark">
                            <div className="w-full p-10">
                                <h2 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                    New Password
                                </h2>
                                <NewPasswordForm
                                    token={params.token}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Blank>
        </>
    );
};

export default Page;
