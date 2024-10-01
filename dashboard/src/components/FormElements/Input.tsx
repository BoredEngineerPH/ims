import React from "react";
import {Colors} from '@/types/colors';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    className?: string | undefined;
    color?: Colors;
    label?: string | React.ReactNode;
    helpText?: string | React.ReactNode;
    register?: any;
    rules?: any;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

const Input: React.FC<Props> = ({ name, className, color, label, helpText, register, rules, icon , iconPosition, ...props }) => {

    function checkAnimation(e: any) {
        if(e.animationName == "onAutoFillStart"){
        } else if(e.animationName == "onAutoFillCancel") {
        }
    }

    const getInputAccent = () => {
        if(color !== undefined){
            if(color === 'default'){
                return `border-gray-300 bg-gray text-black focus:border-primary disabled:text-gray-200 dark:text-white dark:border-strokedark dark:bg-meta-4`;
            }else{
                return `border-${color} text-${color}`;
            }
        }
    };

    return (
        <>
            <div className={`form-control field-${color} ${className && className}`}>
                {label && <label htmlFor={name} className="mb-1 block font-medium text-black dark:text-white">{label}</label>}
                <div className="relative">
                    <input
                        id={name}
                        onAnimationStart={checkAnimation}
                        className={`w-full transition rounded border ${icon ? `py-3 pl-4 ${iconPosition === 'left' ? 'pl-10' : 'pr-10'}` : 'py-3 px-4'}
                            outline-none focus-visible:shadow-none ${getInputAccent()}
                            ${color !== 'default' && `bg-${color} text-${color} bg-opacity-10 border-opacity-60 focus:border-opacity-90 disabled:border-opacity-40 disabled:text-opacity-60`}`}
                        {...register(name, rules)}
                        {...props}
                    />
                    {icon &&
                        <span className={`absolute ${iconPosition === 'left' ? 'left-4' : 'right-4'} top-3.5 ${
                            color ? 'text-'+color : 'text-gray-1'
                        }`}>
                        {icon}
                    </span>
                    }
                </div>
                <div className="text-sm px-2 py-1">{ helpText && helpText }</div>
            </div>
        </>
    );
};

export default Input;
