import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Loc from '@loc';
import {form} from '@app';
import ButtonProgress from '@components/ButtonProgress';

export default (props) => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const forgot = (e) => {

        setLoading(true)

    };

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-10">
                <div className="row">
                    <div className="col-12 mb-4">
                        <TextField
                            className={'w-100 font-weight-light'}
                            size={form.size}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            variant="outlined"
                            label={Loc.app.email}
                        />
                    </div>

                    <div className="col-12 mb-4">
                        <ButtonProgress
                            onClick={e => forgot(e)}
                            loading={loading}
                            className={'text-lowercase'}
                            title={Loc.app.get_pwd}
                        />
                    </div>

                    <div className="col-12 mb-4 text-center">
                        <span
                            onClick={e => props.clickLink(props.modals.signin, e)}
                            className={'link'}>{Loc.app.i_remember}</span>
                    </div>
                </div>
            </div>
        </div>
    )

}
