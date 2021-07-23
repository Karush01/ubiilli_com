import React, {useState} from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default (props) => {

    const [loadImage, setloadImage] = useState(true);

    return (
        <div
            {...props}
        >
            <Skeleton
                className={(!loadImage ? "d-none" : "")}
                variant="rect"
                width="100%">
                <div style={{paddingTop: '75%'}}/>
            </Skeleton>
            <img
                src={props.src}
                className={"img-fluid w-100" + (loadImage ? " d-none " : " ") + (props.className)}
                onLoad={e => setloadImage(false)}
            />
        </div>
    )

}





