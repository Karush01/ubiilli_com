import React, {useState} from 'react';
import StaticHeader from '@containers/StaticHeader';
import Loc from '@loc';
import routes from '@routes';

export default (props) => {

    return (
        <div>
            <StaticHeader
                icon={'contacts'}
                slug={routes.contacts}
                title={Loc.app.contacts_app}
            />
            <div className="container bg-white pt-4 pb-4">

            </div>
        </div>
    )

}





