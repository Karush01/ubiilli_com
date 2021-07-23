import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Preloader from './Preloader';
import Button from '@material-ui/core/Button';
import Loc from '@loc';
import useCart from '@hooks/useCart';
import {useLocalStorage} from '@rehooks/local-storage';
import LocalStorage from '@localStorage';
import {reserve} from '@app';
import FormatPrice from "@components/FormatPrice";


export default (props) => {

    const [cartItems] = useLocalStorage(LocalStorage.cartItems);

    const {addItem} = useCart();

    return (
        <div>
            {props.loading ?
                <Preloader/>
                :
                <div className={'row'}>
                    <div className="col-12">
                        {props.data.getPlace.dishesFormatted.map((item, index) => (
                            <Accordion
                                className={'w-100 mb-3 mt-3 menu-category-item'}
                                key={index}
                            >
                                <AccordionSummary
                                    id={"header-" + index}
                                    className={'menu-cat'}
                                    expandIcon={<ExpandMoreIcon/>}
                                >
                                    <Typography
                                        className={'pr-3 category-name h6 font-weight-normal mb-0'}>{item[0].menuCategory.description.name} ({item.length})</Typography>
                                </AccordionSummary>
                                <AccordionDetails className={'d-block '}>
                                    {item.map((dishe, key) => (
                                        <div
                                            key={key}
                                            className="row mb-3">
                                            <div className="col-12 col-md-8 align-items-center d-flex">
                                                <div className={'w-100 position-relative'}>
                                                    <div className="row">
                                                        <div className="col-9 pr-1">
                                                            <Typography
                                                                className={'font-weight-bold'}>{dishe.name}</Typography>
                                                        </div>
                                                        <div className="align-items-center col-3 d-md-none d-flex pl-1">
                                                            <div
                                                                className="font-weight-bold ml-auto position-relative">
                                                                <FormatPrice price={dishe.price}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <p>{dishe.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="align-items-center col-12 col-md-1 pl-1 pr-1 d-none d-md-flex">
                                                <div
                                                    className="font-weight-bold">
                                                    <FormatPrice price={dishe.price}/>
                                                </div>
                                            </div>
                                            <div className="align-items-center col-12 col-md-3 pl-1 d-flex">
                                                {_.isObject(cartItems) && (props.data.getPlace.id in cartItems) && cartItems[props.data.getPlace.id].includes(parseInt(dishe.id)) ?
                                                    <Button
                                                        onClick={e => props.handleOpenReserve(reserve.cart)}
                                                        size={'small'}
                                                        className={'w-100 text-lowercase secondary'}>
                                                        {Loc.app.added_to_cart}
                                                    </Button>
                                                    :
                                                    <Button
                                                        onClick={e => addItem(props.data.getPlace.id, dishe.id)}
                                                        size={'small'}
                                                        className={'w-100 text-lowercase primary-outlined'}>
                                                        {Loc.app.add_to_cart}
                                                    </Button>
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                </div>
            }
        </div>
    )

}





