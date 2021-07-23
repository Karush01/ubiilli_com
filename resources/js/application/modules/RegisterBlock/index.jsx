import React  from 'react';
import Loc from '@loc';
import paths from '@paths';
import Button from '@material-ui/core/Button';


export default (props) => {

    return (
        <section className={'register-block pt-5 pb-5'}>
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-12 col-lg-6 mb-3 text-center align-self-center">
                        <div>
                            <div className="h4 font-weight-bold">{Loc.app.you_have_rest}</div>
                            <div className={'mt-3 mb-3'}>{Loc.app.restaur_desc}</div>
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-7">
                                    <Button
                                        onClick={e => props.openAuth(_sharedData.userTypes.manager, e )}
                                        className={'w-100 secondary'}>{Loc.app.auth.signup}</Button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-12 col-lg-6 text-center align-self-center">
                        <img className={'img-responsive'} src={'/' + paths.images + '/dinner1.svg'}/>
                    </div>
                </div>
            </div>
        </section>
    )

}





