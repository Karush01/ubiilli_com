import React, {useState, useEffect} from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default (props) => {

    let [loaders, setLoaders] = useState([]);

    useEffect(() => {

        let result = [];

        for (let i = 0; i < 8; i++)
            result.push(<div
                key={i}
                className={'col-12 col-md-6 mb-2'}>
                <Skeleton
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





