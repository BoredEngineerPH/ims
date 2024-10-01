import React from "react";
import { Metadata } from "next";

// Layout
import Blank from "@/components/Layouts/Blank";

// Components
import EmailVerification from '@/form/EmailVerification';

export const metadata: Metadata = {
    title: `Email Verification | ${process.env.APP_NAME}`,
};

const Page = ({ params }: { params: { id: string, hash: string } }) => {
    return (
        <>
            <Blank>
                <div className="flex items-center justify-center w-full">
                    <div className="p-5 w-full h-full overflow-auto max-w-[600px]">
                        <div className="m-auto rounded-xl border border-stroke bg-white shadow-default dark:shadow-none dark:border-strokedark dark:bg-boxdark">
                            <div className="w-full p-10">
                                <EmailVerification
                                    id={params.id}
                                    hash={params.hash}
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
