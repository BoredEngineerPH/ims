import { atom } from 'recoil';
import {Colors} from '@/types/colors';

export type NotificationType = {
    type: Colors;
    message: string;
};

export const notificationState = atom<NotificationType[]>({
    key: 'notification',
    default: []
});
