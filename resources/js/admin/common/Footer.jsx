import React from 'react';
import Loc from '@locAdmin';

export default (props) => {

    return (
        <footer className={'pt-4 pb-4'}>
            <div className="container text-muted text-center small">
                {Loc.admin.copyright} <a className={'text-muted'} target={'_blank'}
                                         href="https://limgro.com">limgro.com</a>
            </div>
        </footer>
    )

}
