import React, {useState, useEffect} from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default (props) => {

    let [loaders, setLoaders] = useState([]);

    useEffect(() => {

        let result = [];

        for (let i = 0; i < 6; i++)
            result.push(<div
                key={i}
                className={'col-12 mb-1'}>
                <Skeleton
                    height={52}
                    width={'100%'}
                    variant={'text'}
                />
            </div>);

        setLoaders(result);

    }, []);

    return (
        <div className={'col-12 pl-0 pr-0'}>
            <div className="row">
                {loaders}
            </div>
        </div>
    )

}


