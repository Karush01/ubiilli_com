import React, {useState, useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import useCart from '@hooks/useCart';
import FormatPrice from "@components/FormatPrice";

export const cartItemsCounter = (id, placeId, cartItems) => {

    return cartItems[placeId].filter((item) => {
        return item === parseInt(id);
    }).length;

};

export default (props) => {

    const {addItem, removeItem, removeAllCartItem} = useCart();

    const [counter, setCounter] = useState(0);

    useEffect(() => {

        setCounter(cartItemsCounter(props.item.id, props.placeId, props.cartItems))

    }, [props.cartItems]);


    return (
        <div className={"row " + (counter == 0 && 'd-none')}>
            <div
                className="align-self-center col-12 col-md-1 pr-0 d-none text-center d-md-block">
                <span className={'font-weight-bold'}>{props.index + 1}</span>
            </div>
            <div className="align-self-center col-12 col-md-5 mb-0">
                <span>{props.item.name}</span>
            </div>
            <div className="align-self-center col-6 col-md-3 d-flex">
                <IconButton
                    onClick={e => addItem(props.placeId, props.item.id)}
                    className={'action-button'}
                    size="small">
                    <AddIcon/>
                </IconButton>
                <TextField
                    value={counter}
                    className={"w-100 text-center items-input"}
                    variant="outlined"
                    margin="dense"
                />
                <IconButton
                    onClick={e => removeItem(props.placeId, props.item.id)}
                    className={'action-button'}
                    size="small">
                    <RemoveIcon
                    />
                </IconButton>
            </div>
            <div className="align-self-center col-4 col-md-2">
                <span className={'text-center font-weight-bold'}>
                    <FormatPrice price={props.item.price}/>
                </span>
            </div>
            <div className="align-self-center col-2 col-md-1 pl-0">
                <IconButton
                    onClick={e => removeAllCartItem(props.placeId, props.item.id)}
                    className={'p-2'}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </div>
            <div className="col-12">
                <hr/>
            </div>
        </div>
    )

};





