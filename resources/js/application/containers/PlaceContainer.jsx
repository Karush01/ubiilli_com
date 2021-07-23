import React, {useEffect} from 'react';
import Loc from '@loc';
import BlockTitle from '@components/BlockTitle';

export default (props) => {


    useEffect(() => {

        window.addEventListener("scroll", e => setScroll(e));

    }, []);

    const setScroll = (e) => {

        let response = document.getElementById('item-scrollable-auto-tab-' + props.item).getBoundingClientRect();

        const multiplier = 53;

        if ((response.top - multiplier) < 0 && (response.top + response.height - multiplier) > 0)
            props.activeItem(parseInt(props.item))

    };

    return (
        <div
            id={'item-scrollable-auto-tab-' + props.item}
            className="row tabs-block">
            <div
                className="col-12 shadow-block pt-3 pb-3 mb-3">
                <BlockTitle title={Loc.app.place_info[parseInt(props.item)]}/>
                {props.children}
            </div>
        </div>
    )

}





