import Link from "next/link";
import Image from "next/image";
import { RiDoubleQuotesL } from "react-icons/ri";
import {PhoneWithAPerson} from '@/components/Icons/PhoneWithAPerson';
export const Auth = () => {
    return (
        <>
        <div className="p-10 text-center">
            <Link className="mb-5.5 inline-block" href="/">
                <Image
                    className="hidden dark:block"
                    src={"/images/logo/logo.svg"}
                    alt={process.env.APP_NAME || 'IMS'}
                    width={216}
                    height={50}
                />
                <Image
                    className="dark:hidden"
                    src={"/images/logo/logo-dark.svg"}
                    alt={process.env.APP_NAME || 'IMS'}
                    width={216}
                    height={50}
                />
            </Link>
            <blockquote className="flex text-md italic font-light mb-8 text-gray-500">
                <span className="text-sm inline-block pr-2 text-gray-400">
                    <RiDoubleQuotesL />
                </span>
                Efficiently organize, track, and utilize data with a streamlined Information Management System...
            </blockquote>

            <span className="mt-15 inline-block">
                <PhoneWithAPerson />
            </span>
        </div>
        </>
    );
}
