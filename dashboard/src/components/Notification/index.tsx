"use client"
import React, {useState, useEffect} from "react";
import { useRecoilValue } from 'recoil';
import { notificationState } from '@/state/notification';
import MessageBox from '@/components/Notification/MessageBox';

const Notification = () => {
    const notificationMessages = useRecoilValue(notificationState);
    useEffect(() => {

    }, []);
    return (
        <>
        <div className="z-99 w-full md:w-100 lg:w-100 absolute top-0 right-0 pt-15">
            <div className="w-full p-4">
                {notificationMessages.map((notification, index) => (
                    <MessageBox
                        type={notification.type}
                    >
                        {/* <h4 className="mb-0.5 text-title-xsm font-medium text-black dark:text-white">{notification.type}</h4> */}
                        <p className="text-sm font-medium">{notification.message}</p>
                    </MessageBox>
                ))}
            </div>
        </div>
        </>
    );
};

export default Notification;
