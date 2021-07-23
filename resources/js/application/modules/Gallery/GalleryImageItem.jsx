import React, {useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default (props) => {

    const [loadImage, setLoadImage] = useState(true);

    return (
        <li className={(props.active ? " active-gallery-picture " : "")} style={{width: props.width}}>


            <img
                className={' img-fluid gallery-image ' + (loadImage ? "d-none" : "")}
                src={props.src}
                onLoad={e => setLoadImage(false)}
            />

            <div className={(!loadImage ? "d-none" : "")}>
                <CircularProgress
                    size={40}
                    thickness={3}
                    className={'text-white'}
                />
            </div>
        </li>
    )

}





