import React, {useState} from 'react';
import Sidebar from './Sidebar';
import PersonalInfo from './Tabs/PersonalInfo';
import ReserveHistory from './Tabs/ReserveHistory';
import ReserveHistoryPlaces from './Tabs/ReserveHistoryPlaces';
import DeliveryHistoryPlaces from './Tabs/DeliveryHistoryPlaces';
import DeliveryHistory from './Tabs/DeliveryHistory';
import MyPlaces from './Tabs/MyPlaces';
import ActiveOrder from './Tabs/ActiveOrder';
import PlaceHandler from './Tabs/PlaceHandler';
import ChangePlaceMenu from "./Tabs/ChangePlaceMenu";
import Finance from './Tabs/Finance';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {LOGOUT_MUTATION} from '@mutations/user';
import {useMutation} from "@apollo/client";
import useAuthUser from '@hooks/useAuthUser';
import LocalStorage from '@localStorage';
import useNotification from '@hooks/notificationHooks';
import {useLocalStorage} from '@rehooks/local-storage';
import {media} from '@app';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HistoryIcon from '@material-ui/icons/History';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import StarIcon from '@material-ui/icons/Star';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import Loc from '@loc';
import ActiveOrderManager from "./Tabs/ActiveOrderManager";

export default (props) => {

    const windowWidth = window.innerWidth;

    const [user] = useLocalStorage(LocalStorage.user);

    const [widthContent, setWidthContent] = useState(windowWidth < media.sm ? '100%' : '38rem');

    const [activeTab, setActiveTab] = useState(undefined);

    const [activePlace, setActivePlace] = useState(undefined);

    const menu = Loc.app.account_menu;

    const [tabs, setTabs] = useState({
        personalInfo: {
            label: 'personal-info',
            component: PersonalInfo,
            icon: <AccountBoxIcon/>,
            menu: true,
            title: menu.personal_info,
            roles: [_sharedData.userTypes.user, _sharedData.userTypes.manager]
        },
        reserveHistory: {
            label: 'reserve-history',
            component: ReserveHistory,
            icon: <HistoryIcon/>,
            menu: true,
            title: menu.reserve_history,
            roles: [_sharedData.userTypes.user]
        },
        reserveHistoryPlaces: {
            label: 'reserve-history-places',
            component: ReserveHistoryPlaces,
            icon: <HistoryIcon/>,
            menu: true,
            title: menu.reserve_history,
            roles: [_sharedData.userTypes.manager]
        },
        deliveryHistoryPlaces: {
            label: 'delivery-history-places',
            component: DeliveryHistoryPlaces,
            icon: <LocalShippingIcon/>,
            menu: true,
            title: menu.delivery_history,
            roles: [_sharedData.userTypes.manager]
        },
        activeOrderManager: {
            label: 'active-order-manager',
            component: ActiveOrderManager,
            icon: <StarIcon/>,
            menu: true,
            title: menu.active_orders,
            roles: [_sharedData.userTypes.manager]
        },
        deliveryHistory: {
            label: 'delivery-history',
            component: DeliveryHistory,
            icon: <LocalShippingIcon/>,
            menu: true,
            title: menu.delivery_history,
            roles: [_sharedData.userTypes.user]
        },
        activeOrder: {
            label: 'active-order',
            component: ActiveOrder,
            icon: <StarIcon/>,
            menu: true,
            title: menu.active_order,
            roles: [_sharedData.userTypes.user]
        },
        myPlaces: {
            label: 'my-places',
            component: MyPlaces,
            icon: <RestaurantIcon/>,
            menu: true,
            title: menu.my_places,
            roles: [_sharedData.userTypes.manager]
        },
        newPlaceHandler: {
            label: 'new-place-handler',
            component: PlaceHandler,
            icon: <AddCircleOutlineIcon/>,
            menu: true,
            title: menu.add_place,
            roles: [_sharedData.userTypes.manager]
        },
        finance: {
            label: 'finance',
            component: Finance,
            icon: <EuroSymbolIcon/>,
            menu: true,
            title: menu.finances,
            roles: [_sharedData.userTypes.manager]
        },
        placeHandler: {
            label: 'place-handler',
            component: PlaceHandler,
            roles: [_sharedData.userTypes.manager]
        },
        changePlaceMenu: {
            label: 'change-place-menu',
            component: ChangePlaceMenu,
            roles: [_sharedData.userTypes.manager]
        },
    });

    const activeTabHandler = (tab, place = undefined) => {

        const key = _.findKey(tabs, function (t) {
            return t.label == tab;
        });

        if (!_.isUndefined(key))
            setActiveTab(key);

        setActivePlace(place);

    };

    const [logout] = useMutation(LOGOUT_MUTATION);

    const {logOutUser, setAuthUser} = useAuthUser();

    const {setErrorHandled, successNotification} = useNotification();

    const handleLogout = async () => {

        let response = await logout()
            .then(response => {

                successNotification(response.data.logout.message);

                props.onClose();

                logOutUser();

            }).catch(error => {

                setErrorHandled(error.graphQLErrors);

            });

    };

    return (
        <div className="row m-0 h-100 account-content">
            <div className="col-12 p-0 h-100">
                <div className="position-relative d-flex h-100">
                    <div
                        className={!_.isUndefined(activeTab) && windowWidth < media.sm ? 'd-none' : 'd-inline-block'}
                        style={{width: windowWidth < media.sm ? '100%' : '20rem'}}
                    >
                        <Sidebar
                            user={user}
                            logout={handleLogout}
                            tabs={tabs}
                            activeTab={activeTab}
                            activeTabHandler={activeTabHandler}
                            onClose={props.onClose}
                        />
                    </div>
                    <div
                        style={{
                            width: widthContent,
                            marginRight: !_.isUndefined(activeTab) ? 0 : ('-' + widthContent)
                        }}
                        className="d-inline-block content account-sidebar-content p-3 bg-light">
                        <div className="w-100 text-right">
                            <IconButton
                                onClick={e => setActiveTab(undefined)}
                                className={'right-chevron bg-white'}
                                size="medium">
                                <ChevronLeftIcon fontSize="inherit"/>
                            </IconButton>
                        </div>

                        <div className="row mt-3">
                            <div className="col-12">
                                {!_.isUndefined(activeTab) && React.createElement(tabs[activeTab].component, {
                                    user: user,
                                    activeTabHandler: activeTabHandler,
                                    tabs: tabs,
                                    activePlace: activePlace
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}





