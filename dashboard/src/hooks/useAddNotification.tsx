import { useRecoilState } from 'recoil';
import { notificationState, NotificationType } from '@/state/notification';
import { Colors } from '@/types/colors';

// Custom hook for adding a notification
export const useAddNotification = () => {
  const [, setNotificationMessage] = useRecoilState(notificationState);

  const addNotification = (type: Colors, message: string) => {
    const newNotification: NotificationType = {
      type,
      message,
    };

    setNotificationMessage((prevNotification) => [
      ...prevNotification,
      newNotification,
    ]);
  };

  return addNotification;
};
