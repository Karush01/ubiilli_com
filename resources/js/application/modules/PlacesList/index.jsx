import React from 'react';
import Preloader from './Preloader';
import Item from './Item';
import EmptyItems from './EmptyItems';


export default (props) => {


    return (
        <div className="row">
            {props.loading ?
                <Preloader/>
                :
                <div className="col-12 search-results">
                    {props.dataItems.searchPlaces.items.length > 0 ?
                        props.dataItems.searchPlaces.items.map((item, index) => (
                            <Item
                                key={index}
                                item={item}
                            />
                        )) :
                        <EmptyItems/>
                    }
                </div>
            }
        </div>
    )

}





