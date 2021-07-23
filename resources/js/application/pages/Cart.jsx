import React, {useEffect} from 'react';
import StaticHeader from '@containers/StaticHeader';
import {Redirect, Link} from 'react-router-dom';
import routes from "@routes";
import Loc from '@loc';
import Button from "@material-ui/core/Button";
import {useLocalStorage} from '@rehooks/local-storage';
import LocalStorage from '@localStorage';
import {createStripeLink} from '@hooks/helperHooks';
import {CHECK_PAYMENT} from '@mutations/order';
import {useMutation} from "@apollo/client";

export default (props) => {

    const [stripeSession] = useLocalStorage(LocalStorage.stripeSession);

    const [checkPayment, {loading}] = useMutation(CHECK_PAYMENT);

    useEffect(() => {

        if (!_.isUndefined(stripeSession))
            checkPayment({variables: {sessionId: stripeSession}})
                .then(response => {
                }).catch(error => {
                console.log(error.graphQLErrors);
            });

    }, []);

    if (props.match.params.slug !== routes.cart.success && props.match.params.slug !== routes.cart.error || _.isUndefined(stripeSession))
        return <Redirect to={'/' + routes.home}/>;

    return (
        <div>
            <StaticHeader
                icon={props.match.params.slug}
                slug={routes.cart[props.match.params.slug]}
                title={Loc.app.cart[props.match.params.slug]}
            />
            <div className="container bg-white pt-4 pb-4">

                <div className="row justify-content-center">
                    <div className="col-12 col-md-5">
                        {props.match.params.slug == routes.cart.success ?
                            <div className={'pt-5 pb-5'}>
                                <div className="h5 block-title position-relative mb-3">{Loc.app.cart.success_info}</div>
                                <div className="h6 mb-3">{Loc.app.cart.success_info_sec}</div>

                                <div className="col-12 w-100 pb-5 pl-0 pr-0">
                                    <Link to={'/' + routes.home}>
                                        <Button
                                            className={'pl-4 pr-4 d-block mt-4 secondary'}>
                                            {Loc.app.to_home}
                                        </Button>
                                    </Link>
                                </div>

                            </div>
                            :
                            <div className={'pt-5 pb-5'}>
                                <div className="h5 block-title position-relative mb-3">{Loc.app.cart.error_info}</div>
                                <div className="h6  mb-3">{Loc.app.cart.error_info_sec}</div>
                                <div className="col-12 w-100 pb-5 pl-0 pr-0">
                                    <Button
                                        onClick={e => createStripeLink(stripeSession)}
                                        className={'pl-4 pr-4 d-block mt-4 secondary'}>
                                        {Loc.app.pay}
                                    </Button>
                                </div>

                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}





