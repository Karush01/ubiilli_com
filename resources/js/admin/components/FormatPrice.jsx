import React, {useState} from 'react';
import {useQuery} from "@apollo/client";
import {GET_ACTIVE_CURRENCY} from "@storeAdmin/queries";

export default (props) => {

    const {data} = useQuery(GET_ACTIVE_CURRENCY);

    return data.activeCurrency.code + parseFloat(props.price).toFixed(2);

}
