import React from "react";
import {Colors} from '@/types/colors';
interface Props {
    color: Colors;
    children: React.ReactNode;
}

const Notification: React.FC<Props> = ({ color, children }) => {
    const getAccentColor = () => {
        if(color === 'default'){
            return 'border-stroke bg-white';
        }
        return `border-${color} bg-${color} bg-opacity-20 `;
        //  dark:border-[#EA4E2C] dark:bg-[#1B1B24]
    };
    return (
        <>
<div className={`animate-fadeIn mb-6 lg:max-w-[490px] md:max-w-[490px] rounded-lg border py-4 pl-4 pr-5.5 shadow-2 ${getAccentColor()} `}>
    <div className="flex items-center justify-between">
        <div className="flex flex-grow items-center gap-5">
            {children}
        </div>
        <div>
            <button className="flex h-7 w-7 items-center justify-center rounded-md bg-white dark:bg-meta-4">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.854423 0.85186C1.2124 0.493879 1.79281 0.493879 2.15079 0.85186L7.0026 5.70368L11.8544 0.85186C12.2124 0.493879 12.7928 0.493879 13.1508 0.85186C13.5088 1.20984 13.5088 1.79024 13.1508 2.14822L8.29897 7.00004L13.1508 11.8519C13.5088 12.2098 13.5088 12.7902 13.1508 13.1482C12.7928 13.5062 12.2124 13.5062 11.8544 13.1482L7.0026 8.2964L2.15079 13.1482C1.79281 13.5062 1.2124 13.5062 0.854423 13.1482C0.496442 12.7902 0.496442 12.2098 0.854423 11.8519L5.70624 7.00004L0.854423 2.14822C0.496442 1.79024 0.496442 1.20984 0.854423 0.85186Z" fill="#637381"></path>
                </svg>
            </button>
        </div>
    </div>
</div>
{/* <div className={`flex transition rounded w-full bg-opacity-10 border-l-6 border-${color} shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 bg-${color} p-${padding ? padding : '3'} ${className}`}>
{icon && <div className={`mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg text-2xl text-${color}`}>{icon}</div> }
<div className="w-full">
{children}
</div>
</div> */}
        </>
    );
};

export default Notification;
