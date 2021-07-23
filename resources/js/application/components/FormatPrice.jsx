import React, {useState} from 'react';
import {useQuery} from "@apollo/client";
import {GET_ACTIVE_CURRENCY} from "../store/queries";

export default (props) => {

    const {data} = useQuery(GET_ACTIVE_CURRENCY);

    return parseFloat(props.price).toFixed(2) + data.activeCurrency.label;

}
