import LocalStorage from '@localStorage';
import {SET_IS_AUTH} from "../store/mutations";
import {useMutation} from "@apollo/client";

const useAuthUser = () => {

    const [setAuth] = useMutation(SET_IS_AUTH);

    const setAuthUser = (token) => {

        setAuth({variables: {isAuthorized: true}})

        localStorage.setItem(LocalStorage.token, token);

    };

    const logOutUser = () => {

        setAuth({variables: {isAuthorized: false}});
        localStorage.removeItem(LocalStorage.token);
    };

    return {logOutUser, setAuthUser};
};

export default useAuthUser;
