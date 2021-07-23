import React, {useState} from 'react';
import {useQuery} from "@apollo/client";
import NotFound from "@pages/NotFound";
import StaticHeader from '@containers/StaticHeader';
import {GET_STATIC_PAGE} from '@queries/page';
import Parser from 'html-react-parser';

export default (props) => {

    const {loading, error, data} = useQuery(GET_STATIC_PAGE, {variables: {slug: props.match.params.slug}});

    if (!loading && _.isEmpty(data))
        return <NotFound/>;

    return (
        <div>
            {!loading &&
            <div>
                <div>
                    <StaticHeader
                        icon={props.match.params.slug}
                        slug={props.match.params.slug}
                        title={data.getStaticPageBySlug.title}
                        meta={data.getStaticPageBySlug.meta}
                    />
                    <div className="container bg-white pt-4 pb-4">
                        <div dangerouslySetInnerHTML={{__html: Parser(data.getStaticPageBySlug.content)}}/>

                    </div>
                </div>
            </div>
            }
        </div>
    )
}





