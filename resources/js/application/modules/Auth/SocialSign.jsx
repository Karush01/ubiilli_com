import React from 'react';
import Loc from '@loc';
import Button from '@material-ui/core/Button';
import {SOCIAl_LOGIN_MUTATION} from '@mutations/user';
import {useMutation} from "@apollo/client";
import {OldSocialLogin as SocialLogin} from 'react-social-login';
import useNotification from '@hooks/notificationHooks';


export default (props) => {

    const [socialLogin, {data}] = useMutation(SOCIAl_LOGIN_MUTATION);

    const {setErrorHandled} = useNotification();

    const handleSocialLogin = async (user) => {

        if (!_.isNull(user)) {

            await socialLogin({
                variables: {
                    provider: user._provider,
                    token: user._token.accessToken,
                    user_type: props.userType
                }
            }).then((response) => {

                const token = response && response.data && response.data.socialLogin && response.data.socialLogin.access_token;

                props.auth(token, response.data.socialLogin.user, response.data.socialLogin.message);

            }).catch((error) => {

                setErrorHandled(error.graphQLErrors);

            });

        }

    };

    return (
        <div
            className="row justify-content-center">
            <div className="col-12 col-sm-11">
                <div className="text-muted text-center font-weight-light mb-3">
                    {Loc.app.soc_sign}
                </div>
            </div>
            {_sharedData.socialProviders.map((item, index) => (
                <div
                    key={index}
                    className="socials-list w-100">
                    <SocialLogin
                        provider={item.provider}
                        appId={item.client}
                        callback={handleSocialLogin}
                    >
                        <div className="justify-content-center ml-0 mr-0 row">
                            <Button
                                variant="contained"
                                className={"col-12 mt-2 mb-2 col-sm-8  default social-button"}
                            >
                    <span
                        className={'d-block position-relative social-text social-' + item.provider}>{item.provider}</span>
                            </Button>
                        </div>
                    </SocialLogin>
                </div>
            ))}
        </div>
    )

}




