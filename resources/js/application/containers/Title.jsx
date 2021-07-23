import React, {useState} from 'react';
import {useQuery, useMutation} from "@apollo/client";
import {SET_META} from "../store/mutations";
import {GET_META} from "@queries/meta";

export default (props) => {


    const [setMeta] = useMutation(SET_META);


    if (!_.isUndefined(props.meta)) {
        setMeta({variables: {meta: props.meta}})
    } else if (!_.isUndefined(props.slug)) {

        //витягнемо мета-теги для заголовків
        const {loading, error, data} = useQuery(GET_META, {
            variables: {
                slug: props.slug
            }
        });

        if (_.isObject(data) && _.isObject(data.getMetaTags))
            setMeta({variables: {meta: data.getMetaTags}})

    } else {
        setMeta({variables: {meta: {title: props.title}}})
    }


    return (
        <span>{props.title}</span>
    )

}





