import {notification} from 'antd';

const useNotification = () => {

    const setErrorHandled = (error) => {

        notification.error({message: error[0].message});

    };

    const successNotification = (message) => {

        notification.success({message: message});

    }

    return {setErrorHandled, successNotification};


};

export default useNotification;
