import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/components/ClickOutside";
import {
    User,
    Settings,
    Logout
} from '@/components/Icons/UI';



const DropdownUser = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
            <Link
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2"
                href="#"
            >
                <span className="hidden text-right lg:block">
                    <span className="block text-sm font-bold text-gray-800 dark:text-gray-200">
                        Thomas Anree
                    </span>
                    {/* <span className="block text-xs">UX Designer</span> */}
                </span>

                {/* <span className="h-12 w-12 rounded-full">
                    <Image
                        width={112}
                        height={112}
                        src={"/images/user/user-01.png"}
                        style={{
                        width: "auto",
                        height: "auto",
                        }}
                        alt="User"
                    />
                </span> */}

                <svg
                    className="hidden fill-current sm:block"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                        fill=""
                    />
                </svg>
            </Link>

            {dropdownOpen && (
                <div
                className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:shadow-none dark:border-strokedark dark:bg-boxdark`}
                >
                    <ul className="flex flex-col gap-1 border-b border-stroke p-2 dark:border-strokedark">
                        <li>
                            <Link
                                href="/account"
                                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out px-3 py-2.5 rounded dark:hover:text-white hover:bg-gray-200 dark:hover:bg-meta-4 hover:text-gray-600 lg:text-base"
                            >
                                <User className="text-2xl" />
                                <span className="text-md">My Profile</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/account/settings"
                                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out px-3 py-2.5 rounded dark:hover:text-white hover:bg-gray-200 dark:hover:bg-meta-4 hover:text-gray-600 lg:text-base"
                            >
                                <Settings className="text-2xl" />
                                <span className="text-md">Account Settings</span>
                            </Link>
                        </li>
                    </ul>
                    <div className="p-2">
                        <button
                            className="flex items-center w-full gap-3.5 px-3 py-2.5 text-sm font-medium duration-300 ease-in-out rounded hover:bg-gray-200 dark:hover:bg-meta-4 dark:hover:text-white hover:text-gray-600 lg:text-base"
                        >
                            <Logout className="text-2xl" />
                            <span className="text-md">Log Out</span>
                        </button>
                    </div>

                </div>
            )}
        </ClickOutside>
    );
};

export default DropdownUser;
