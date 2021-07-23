import React from 'react';
import StaticHeader from '@containers/StaticHeader';
import Loc from '@loc';
import FaqList from '@modules/FaqList';
import routes from '@routes';

export default (props) => {

    return (
        <div>
            <StaticHeader
                icon={'faq'}
                slug={routes.faq}
                title={Loc.app.faq_app}
            />
            <div className="container bg-white pt-4 pb-4">
                <FaqList/>
            </div>
        </div>
    )

}





