import React from "react";
import { Metadata } from "next";
import Blank from "@/components/Layouts/Blank";
import NotFound from '@/form/NotFound';

export const metadata: Metadata = {
    title: `Ooppss!! Sorry Page Not Found | ${process.env.APP_NAME}`,
};

const NotFoundPage: React.FC = () => {
    return (
        <Blank>
            <NotFound />
        </Blank>
    );
};

export default NotFoundPage;
