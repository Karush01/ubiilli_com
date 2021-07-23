import React, {useState, useEffect} from 'react';
import Carousel from './Carousel';
import Loc from '@loc';

export default (props) => {

    const itemsCount = 12;

    const [items, setItems] = useState([]);

    useEffect(() => {

        let result = [];

        for (let i = 0; i < itemsCount; i++)
            result.push(i + 1);

        setItems(result);

    }, []);

    return (
        <div className="col-12 pl-5 pr-5 ml-3 mr-3 mb-3">
            <div className="h6 font-weight-light mb-3">{Loc.app.num_persons}</div>
            <Carousel>
                {items.map((item, index) => (
                    <div
                        onClick={e => props.setData(item, props.property, e)}
                        key={index}
                    >
                        <div
                            className={"m-2 text-center pt-3 pb-3 position-relative d-block carousel-item-slide " + (item == props.data.persons && ' font-weight-bold active-slide ')}>
                            {item}
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )

}


