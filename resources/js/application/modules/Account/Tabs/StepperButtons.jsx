import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Loc from '@loc';
import ButtonProgress from '@components/ButtonProgress';

export default (props) => {

    return (
        <div className={'row justify-content-end'}>

            <div className="col-6 col-md-4">
                <Button
                    className={'w-100 ' + (props.activeStep === 0 && "d-none")}
                    onClick={e => props.handleBack(e)}
                >{Loc.app.back}</Button>
            </div>

            <div className="col-6 col-md-4">
                <ButtonProgress
                    className={'w-100 primary'}
                    onClick={e => props.handleNext(e)}
                    loading={props.loading}
                    title={props.activeStep === 3 ? Loc.app.save : Loc.app.next}
                />
            </div>
        </div>
    )

}





