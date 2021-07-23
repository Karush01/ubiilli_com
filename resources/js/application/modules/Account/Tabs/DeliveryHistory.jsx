import React, {useState} from 'react';
import Title from "../Title";
import Loc from '@loc';
import {GET_ACCOUNT_ORDERS_HISTORY} from '@queries/user';
import {useQuery} from "@apollo/client";
import ReserveList from '@modules/ReserveList';
import {fetchingData} from '@app';

export default (props) => {

    const {data, error, loading} = useQuery(GET_ACCOUNT_ORDERS_HISTORY, {
        variables: {delivery: true},
        fetchPolicy: fetchingData.noCache
    });


    return (
        <div className="row">
            <Title
                title={Loc.app.account_menu.delivery_history}
            />
            <ReserveList
                loading={loading}
                data={_.isUndefined(data) ? undefined : data.getOrdersHistory}
            />
        </div>
    );

}





