import React, {useState, useEffect} from 'react';
import Title from "../Title";
import Loc from '@loc';
import {GET_ACCOUNT_PLACE_ORDERS_HISTORY} from '@queries/user';
import {useLazyQuery} from "@apollo/client";
import ReserveList from '@modules/ReserveList';
import {fetchingData} from '@app';


export default (props) => {

    const [orders, setOrders] = useState([]);

    const [ordersLength, setOrdersLength] = useState(0);

    const [loadedAll, setLoadedAll] = useState(false);

    const [getPlaceOrdersHistory, {called, loading}] = useLazyQuery(GET_ACCOUNT_PLACE_ORDERS_HISTORY,
        {
            variables: {
                skip: ordersLength || loadedAll,
                delivery: true
            },
            fetchPolicy: fetchingData.noCache,
            onCompleted: (data) => {

                if (data.getPlaceOrdersHistory.length == 0)
                    setLoadedAll(true);

                setOrders([...orders.concat(data.getPlaceOrdersHistory)]);
            }
        });


    const loadItems = () => {

        setOrdersLength(orders.length);

        getPlaceOrdersHistory();

    };


    useEffect(() => {

        loadItems();

    }, []);

    return (
        <div className="row">
            <Title
                title={Loc.app.account_menu.delivery_history}
            />
            <ReserveList
                loadedAll={loadedAll}
                callBack={loadItems}
                loading={loading}
                data={orders}
            />
        </div>
    )


}


