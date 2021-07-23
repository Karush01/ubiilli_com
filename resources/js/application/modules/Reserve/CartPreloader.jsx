import React, {useState, useEffect} from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default (props) => {

    let [loaders, setLoaders] = useState([]);

    const [size, setSize] = useState(26);

    useEffect(() => {

        let result = [];

        for (let i = 0; i < 4; i++)
            result.push(
                <div key={i} className="row">
                    <div className="col-12 col-md-1 pr-0 d-none  d-md-block">
                        <Skeleton variant="circle" className={'mr-auto'} height={size} width={size}/>
                    </div>
                    <div className="col-12 col-md-5 mb-2">
                        <Skeleton variant="rect" width={'100%'} height={size}/>
                    </div>
                    <div className="col-6 col-md-3">
                        <Skeleton variant="rect" width={'100%'} height={size}/>
                    </div>
                    <div className="col-4 col-md-2">
                        <Skeleton variant="rect" width={'100%'} height={size}/>
                    </div>
                    <div className="col-2 col-md-1 pl-0">
                        <Skeleton variant="circle" className={'ml-auto'} height={size} width={size}/>
                    </div>
                    <div className="col-12">
                        <hr/>
                    </div>
                </div>
            )

        setLoaders(result);

    }, [])


    return (
        <div>
            {loaders}
        </div>
    )

}





