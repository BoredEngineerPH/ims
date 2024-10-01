import React, {useEffect, useState, useRef} from "react";
import {Colors} from '@/types/colors';
import {
    FiCheck,
    FiX
} from "react-icons/fi";
import { IoAlert } from "react-icons/io5";
interface Props {
    type: Colors;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

const MessageBox: React.FC<Props> = ({ type, icon, children }) => {
    const [show, setShow] = useState<boolean>(true);
    const hasPageBeenRendered = useRef(false);
    const boxIcon = () => {
        if(type === 'success'){
            return <FiCheck className="text-2xl" />
        }else if(type === 'danger' || type === 'error'){
            return <FiX className="text-2xl" />
        }
        return <IoAlert className="text-2xl" />
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if(show === true){
                setShow(false);
            }
        }, 60000);
        return () => clearTimeout(timer);
    }, [show, setShow]);

    return (
        <>
            {show &&
            <div className="animate fade-In w-full rounded-lg py-4 pl-4 pr-4.5 shadow-2 bg-white dark:bg-meta-4 mb-6">
                <div className="flex items-center justify-between">
                    <div className="notification-body flex flex-grow items-center gap-4">
                        <div className={`flex h-10 w-full max-w-10 items-center justify-center`}>
                            {icon ? icon : <div className={`rounded-full text-white bg-${type}`}>{boxIcon()}</div>}
                        </div>
                        <div className="notification-message">
                            {children}
                        </div>
                    </div>

                    <div className="notification-footer pt-2">
                        <button onClick={() => setShow(!show)}>
                            <FiX className="text-2xl" />
                        </button>
                    </div>
                </div>
            </div>
            }
        </>
    );
};

export default MessageBox;
