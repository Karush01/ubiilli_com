import React, {useState, useEffect} from 'react';
import Menu from "@modules/PlaceHandler/Menu";
import {useLazyQuery, useMutation} from "@apollo/client";
import {GET_PLACE_MENU} from '@queries/place';
import {fetchingData} from '@app';
import Title from "../Title";
import Loc from '@loc';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MenuHandlerForm from "@containers/MenuHandlerForm";
import {PLACE_MENU_HANDLER_MUTATION} from '@mutations/user';
import useNotification from '@hooks/notificationHooks';
import AccountPreloader from "@components/AccountPreloader";

const getInitialState = () => {
    return {name: '', description: '', price: '', menu_category_id: ''}
};

export default (props) => {

    const [getPlace, {called, loading: placeLoading, data: placeData}] = useLazyQuery(GET_PLACE_MENU, {
        variables: {slug: props.activePlace},
        fetchPolicy: fetchingData.noCache,
        skip: _.isUndefined(props.activePlace)
    });

    const [placeHandlerMenu, {loading}] = useMutation(PLACE_MENU_HANDLER_MUTATION);

    const {setErrorHandled, successNotification} = useNotification();

    const [menu, setMenu] = useState([]);

    const [editForm, setEditForm] = useState(false);

    const [newItem, setNewItem] = useState(getInitialState());

    const changeData = (value, field) => {

        let newState = {...newItem};

        newState[field] = value;

        setNewItem(newState);

    };

    const removeItem = (index, parent) => {

        let newMenu = [...menu];

        if (newMenu[parent].length == 1) {

            delete newMenu[parent];
            newMenu = _.without(newMenu, undefined);

        } else {

            delete newMenu[parent][index];

            newMenu[parent] = _.without(newMenu[parent], undefined);

        }


        setMenu([...newMenu]);

    };

    const createNewItem = async () => {

        await placeHandlerMenu({
            variables: {
                menu_data: {
                    place_id: placeData.getPlace.id,
                    menu: newItem
                }
            }
        }).then((response) => {

            successNotification(response.data.placeHandlerMenu.message);

            setNewItem(getInitialState());

            getPlace();

        }).catch((error) => {
            setErrorHandled(error.graphQLErrors);
        });

    };

    useEffect(() => {

        getPlace();

    }, []);

    useEffect(() => {

        if (!_.isUndefined(props.activePlace) && !_.isUndefined(placeData))
            setMenu(placeData.getPlace.dishesFormatted);

    }, [placeData]);

    return (
        <div className="row">
            <Title
                title={Loc.app.account_menu.edit_menu}
            />
            <div className="col-12 scrolled-block pb-4">

                {editForm ?
                    <div className="mt-3">
                        <MenuHandlerForm
                            item={newItem}
                            changeData={changeData}
                            callBack={createNewItem}
                            loading={loading}
                        />
                    </div>
                    :
                    <div className="w-100 text-right">
                        <Button
                            startIcon={<AddCircleOutlineIcon/>}
                            variant="outlined"
                            onClick={e => setEditForm(true)}
                            className={' primary-outlined text-lowercase'}>
                            {Loc.app.place_handler.add_dishe}
                        </Button>
                    </div>
                }

                {_.isUndefined(placeData) ?
                        <AccountPreloader/>
                    :
                    <Menu
                        menu={menu}
                        changeData={setMenu}
                        placeId={placeData.getPlace.id}
                        removeItem={removeItem}
                    />
                }
            </div>
        </div>
    )

}





