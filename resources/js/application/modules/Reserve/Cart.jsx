import React, {useState, useEffect} from 'react';
import Loc from '@loc';
import {useLocalStorage} from '@rehooks/local-storage';
import LocalStorage from '@localStorage';
import {GET_PLACE_DISHES} from '@queries/place';
import {useQuery} from "@apollo/client";
import CartPreloader from './CartPreloader';
import Button from '@material-ui/core/Button';
import {fetchingData} from '@app';
import CartItem, {cartItemsCounter} from './CartItem';
import {reserve} from '@app';
import FormatPrice from "@components/FormatPrice";

export default (props) => {

    const [cartItems] = useLocalStorage(LocalStorage.cartItems);

    const [cartLocalItems, setCartLocalItems] = useState({});

    const {loading, error, data} = useQuery(GET_PLACE_DISHES, {
        variables: {ids: cartLocalItems[props.placeId]},
        fetchPolicy: fetchingData.noCache
    });

    const [localCartItems] = useLocalStorage(LocalStorage.cartItems);

    const calcAllPrice = () => {

        let result = 0;

        data.getPlaceDishes.map((item, index) => {
            result += cartItemsCounter(item.id, props.placeId, localCartItems) * item.price;
        });

        return result;
    };

    useEffect(() => {

        setCartLocalItems(cartItems);

    }, []);

    return (
        <div className="row">
            <div className="col-12">
                <div className="h6 text-center font-weight-light pl-5 pr-5 mb-4">
                    <div className={' mx-auto '}>{Loc.app.your_menu}</div>
                    <div className="w-25 mx-auto divider-line mt-2 mb-2"/>
                </div>
                {loading ?
                    <CartPreloader/>
                    :
                    <div className="row">
                        <div className="col-12">
                            {!_.isEmpty(localCartItems[props.placeId]) ?
                                <div className="row cart-items-list">
                                    <div className="col-12">
                                        {data.getPlaceDishes.map((item, index) => (
                                            <CartItem
                                                placeId={props.placeId}
                                                cartItems={localCartItems}
                                                index={index}
                                                item={item}
                                                key={index}/>
                                        ))}
                                    </div>
                                </div>

                                :
                                <div className="row pt-4 pb-5">
                                    <div className="col-12">
                                        <div
                                            className="m-auto d-block position-relative u-icon u-icon-md u-icon-basket"/>
                                    </div>

                                    <div className="col-12">
                                        <div className="h5 text-center mt-4">{Loc.app.your_cart_empty}</div>
                                    </div>
                                </div>
                            }
                            {!_.isEmpty(localCartItems[props.placeId]) &&
                            <div className="row mt-4">
                                <div className="col-12 mb-3">
                                    <span
                                        className={'d-block font-weight-bold text-right w-100'}>{Loc.app.all_sum}:
                                        <FormatPrice price={calcAllPrice()}/>
                                    </span>
                                </div>
                                { props.type== reserve.cart ?
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-12 col-md-6 mb-3">
                                                <Button
                                                    onClick={e => props.setModal(reserve.reserve)}
                                                    className={'w-100 primary'}>
                                                    {Loc.app.reserve}
                                                </Button>
                                            </div>
                                            <div className="col-12 col-md-6 mb-3">
                                                <Button
                                                    disabled={!props.delivery}
                                                    onClick={e => props.setModal(reserve.order)}
                                                    variant="outlined"
                                                    className={'w-100 primary-outlined'}>
                                                    {Loc.app.order_food_btn}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="col-12">
                                        <div className="row justify-content-center">
                                            <div className="col-12 col-md-5  mb-3">
                                                <Button
                                                    onClick={e => props.setModal(props.type)}
                                                    className={'w-100 primary'}>
                                                    {Loc.app.next}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )

}





