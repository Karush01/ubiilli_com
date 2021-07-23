import LocalStorage from '@localStorage';
import {SET_IS_AUTH} from "../store/mutations";
import {useMutation} from "@apollo/client";
import {writeStorage, deleteFromStorage, useLocalStorage} from '@rehooks/local-storage';

const useAuthUser = () => {

    const [setAuth] = useMutation(SET_IS_AUTH);

    const setAuthUser = (token, user) => {

        setAuth({variables: {isAuthorized: true}});

        localStorage.setItem(LocalStorage.token, token);

        writeStorage(LocalStorage.token, token);

        writeStorage(LocalStorage.user, user);

    };

    const logOutUser = () => {

        setAuth({variables: {isAuthorized: false}});

        localStorage.removeItem(LocalStorage.token);

        localStorage.removeItem(LocalStorage.user);
    };

    return {logOutUser, setAuthUser};
};

export default useAuthUser;
