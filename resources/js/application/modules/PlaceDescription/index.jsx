import React from 'react';
import Preloader from './Preloader';

export default (props) => {


    return (
        <div>
            {props.loading ?
                <Preloader/>
                :
                <p>
                    {props.data.getPlace.description}
                </p>
            }
        </div>
    )

}





