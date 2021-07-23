import React from 'react';
import MenuItem from './MenuItem';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Loc from '@loc';

export default (props) => {

    return (
        <div className={'row pt-4'}>
            {props.menu.length > 0 ?
                <div className="col-12">
                    {props.menu.map((item, index) => (
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
                                    <MenuItem
                                        key={key}
                                        index={key}
                                        parent={index}
                                        dishe={dishe}
                                        placeId={props.placeId}
                                        removeItem={props.removeItem}
                                    />
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
                :
                <div className="col-12">
                    <div className="mt-5 mb-5 row">
                        <div className="col-12 mb-5 mt-5">
                            <div
                                className={"m-auto d-block position-relative u-icon u-icon-md u-icon-chef"}/>
                            <div className="mt-5 font-weight-bold h5 w-100 text-center">{Loc.app.empty_list_menu}</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )

}





