import React, { useState } from "react";
import {Colors} from '@/types/colors';
import { FiCheck } from "react-icons/fi";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    color: Colors;
    register?: any;
    rules?: any;
    children: React.ReactNode;
}

const Checkbox: React.FC<Props> = ({ name, color, value, register, rules, children}) => {
    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                id={name}
                className={`relative peer shrink-0 appearance-none w-5 h-5 border-none rounded bg-gray-300 mt-1 mr-2 disabled:bg-opacity-200`}
                {...register(name, rules)}
            />
            <label htmlFor={name}>{children}</label>
            <span className={`absolute text-xl mt-1 hidden peer-checked:block text-${color} disabled:text-opacity-6.`}><FiCheck /></span>
        </div>
    );
};
export default Checkbox;
