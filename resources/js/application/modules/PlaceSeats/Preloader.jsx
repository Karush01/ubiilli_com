import React, {useState, useEffect} from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default (props) => {

    const items = () => {

        let result = [];

        for (let i = 0; i < 5; i++)
            result.push(
                <div
                    key={i}
                    className={"col-" + (i == 4 ? 2 : (i + 1))}>
                    <Skeleton
                        width={'100%'}
                        variant={'text'}
                    />
                </div>);

        return _.shuffle(result);

    }

    let [loaders, setLoaders] = useState([]);

    useEffect(() => {

        let result = [];

        for (let i = 0; i < 5; i++)
            result.push(<div
                key={i}
                className="row">
                {items()}
            </div>);


        setLoaders(result);


    }, []);

    return (
        <div className={'col-12 pl-0 pr-0'}>
            {loaders}
        </div>
    )

}





