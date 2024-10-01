import React from "react";
import {Colors} from '@/types/colors';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: Colors;
    size?: 'sm' | 'md' | 'lg' | 'xl' | undefined;
    corner?: 'rounded' | 'rounded-lg' | 'rounded-full' | undefined;
    className?: string;
    children: React.ReactNode;
}

const Button: React.FC<Props> = ({ color, size, className, children, ...props }) => {

    const getAccent = () => {
        switch(color){
            case 'primary':
                return 'text-white bg-primary';
            case 'secondary':
                return 'text-white bg-secondary';
            case 'success':
                return 'text-white bg-success';
            case 'danger':
                return 'text-white bg-danger';
            case 'warning':
                return 'text-black bg-warning';
            case 'info':
                return 'text-black bg-info';
            case 'light':
                return 'text-black bg-light';
            case 'dark':
                return 'text-white bg-dark';

        }
    };

    const getSize = () => {
        switch(size){
            case 'sm':
                return 'py-2 px-6 text-sm';
            case 'md':
                return 'py-4 px-6';
            case 'lg':
                return 'py-5 px-6 text-lg';
            case 'xl':
                return 'py-6 px-6 text-xl';
            default:
                return 'py-4 px-6';
        }
    };

    return (
        <button
            className={`transition border-none flex items-center justify-center ${getSize()} ${getAccent()} hover:bg-opacity-90 disabled:bg-opacity-50 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
