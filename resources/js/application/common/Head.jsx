import React, {useState} from 'react';
import {Helmet} from "react-helmet";
import {useQuery} from "@apollo/client";
import {GET_META} from '../store/queries';
import Loc from '@loc';


export default (props) => {


    const {data} = useQuery(GET_META);


    return (
        <Helmet>
            <title>{data.meta.title} | {Loc.app.name}</title>
            <meta name="description" content={data.meta.description}/>
            <meta name="keywords" content={data.meta.keywords}/>
            <meta content={data.meta.title}/>
            <meta property="og:description" content={data.meta.description}/>
            <meta property="og:title" content={data.meta.title}/>
        </Helmet>
    )

}





