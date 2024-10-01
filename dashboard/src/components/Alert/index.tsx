import React from "react";
import {Colors} from '@/types/colors';
interface Props {
    color: Colors;
    padding?: number;
    className?: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

const Alert: React.FC<Props> = ({ color, padding, className, icon, children }) => {
  return (
        <div className={`flex transition rounded w-full bg-opacity-10 border-l-6 border-${color} shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 bg-${color} p-${padding ? padding : '3'} ${className}`}>
            {icon && <div className={`mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg text-2xl text-${color}`}>{icon}</div> }
            <div className="w-full">
                {children}
            </div>
        </div>
  );
};

export default Alert;
