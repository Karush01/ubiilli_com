import {useSnackbar} from 'notistack';
import {notification} from '@app';

const useNotification = () => {

    const {enqueueSnackbar} = useSnackbar();


    const setErrorHandled = (error) => {

        enqueueSnackbar(error[0].message, {variant: notification.types.error});

    };

    const successNotification = (message) => {

        enqueueSnackbar(message, {variant: notification.types.success});

    }

    return {setErrorHandled, successNotification};


};

export default useNotification;
