import React from 'react';
import Title from "../Title";
import Loc from '@loc';
import {GET_USER_PLACES} from '@queries/user';
import {useQuery} from "@apollo/client";
import Button from '@material-ui/core/Button';
import AccountPreloader from "@components/AccountPreloader";


export default (props) => {

    const {data, error, loading} = useQuery(GET_USER_PLACES);

    return (

        <div className="row">
            <Title
                title={Loc.app.account_menu.my_places}
            />

            <div className="col-12 scrolled-block pb-4">

                {loading ?
                    <AccountPreloader/>
                    :

                    data.getUserPlaces.length > 0 ?
                        data.getUserPlaces.map((item, index) => (
                            <div
                                key={index}
                                className="row pt-3 pl-md-3 ">
                                <div className="col-12 col-md-6 d-flex align-items-center mb-3 ">
                                    <div className="h6 mb-0 font-weight-light">{item.name}</div>
                                </div>
                                <div className="col-6 col-md-3 mb-3 ">
                                    <Button
                                        onClick={e => props.activeTabHandler(props.tabs.changePlaceMenu.label, item.slug)}
                                        size={'small'}
                                        className={'w-100 text-lowercase secondary'}>
                                        {Loc.app.change_menu}
                                    </Button>
                                </div>
                                <div className="col-6 col-md-3 mb-3 ">
                                    <Button
                                        onClick={e => props.activeTabHandler(props.tabs.placeHandler.label, item.slug)}
                                        size={'small'}
                                        className={'w-100 text-lowercase primary-outlined'}>
                                        {Loc.app.edit}
                                    </Button>
                                </div>
                            </div>
                        ))
                        :
                        <div className="mt-5 mb-5 row">
                            <div className="col-12 mb-5 mt-5">
                                <div
                                    className={"m-auto d-block position-relative u-icon u-icon-md u-icon-empty-zoom"}></div>
                                <div className="mt-5 font-weight-bold h5 w-100 text-center">{Loc.app.empty_list}</div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )

}





