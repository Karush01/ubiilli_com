import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import {useMutation} from "@apollo/client";
import MenuHandlerForm from "@containers/MenuHandlerForm";
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {PLACE_MENU_HANDLER_MUTATION, PLACE_MENU_REMOVE_MUTATION} from '@mutations/user';
import useNotification from '@hooks/notificationHooks';
import FormatPrice from "@components/FormatPrice";

export default (props) => {

    const [editForm, setEditForm] = useState(false);

    const [menuItem, setMenuItem] = useState(undefined);

    const [placeHandlerMenu, {loading}] = useMutation(PLACE_MENU_HANDLER_MUTATION);

    const [placeRemoveMenu, {loading: removeLoading}] = useMutation(PLACE_MENU_REMOVE_MUTATION);

    const {setErrorHandled, successNotification} = useNotification();

    const changeData = (value, field) => {

        let newState = {...menuItem};

        newState[field] = value;

        setMenuItem(newState);

    };

    const saveData = async (e) => {

        await placeHandlerMenu({
            variables: {
                menu_data: {
                    place_id: props.placeId,
                    menu: menuItem
                }
            }
        }).then((response) => {

            successNotification(response.data.placeHandlerMenu.message);

            setEditForm(false);

        }).catch((error) => {
            setErrorHandled(error.graphQLErrors);
        });

    };

    const removeItem = async (id) => {

        await placeRemoveMenu({
            variables: {
                menu_data: {
                    place_id: props.placeId,
                    menu: {
                        id: id
                    }
                }
            }
        }).then((response) => {

            successNotification(response.data.placeRemoveMenu.message);

            setEditForm(false);

            props.removeItem(props.index, props.parent);

        }).catch((error) => {
            setErrorHandled(error.graphQLErrors);
        });

    };

    useEffect(() => {

        setMenuItem({
            id: props.dishe.id,
            price: props.dishe.price,
            name: props.dishe.name,
            description: props.dishe.description,
        });

    }, [props.dishe.id]);

    if (_.isUndefined(menuItem))
        return null;

    if (editForm)
        return <MenuHandlerForm
            callBack={saveData}
            loading={loading}
            changeData={changeData}
            item={menuItem}
        />;

    return (
        <div className="position-relative">
            <div
                className="row mb-3">
                {removeLoading &&
                <div className="backdrop-preloader"/>
                }
                <div className="col-12 col-md-8 align-items-center d-flex">
                    <div className={'w-100 position-relative'}>
                        <div className="row">
                            <div className="col-9 pr-1">
                                <Typography
                                    className={'font-weight-bold'}>{menuItem.name}</Typography>
                            </div>
                            <div className="align-items-center col-3 d-md-none d-flex pl-1">
                                <div
                                    className="font-weight-bold ml-auto position-relative">
                                    <FormatPrice price={menuItem.price}/>
                                </div>
                            </div>
                            <div className="col-12">
                                <p>{menuItem.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="align-items-center col-12 col-md-1 pl-1 pr-1 d-none d-md-flex">
                    <div
                        className="font-weight-bold">
                        <FormatPrice price={menuItem.price}/>
                    </div>
                </div>
                <div className="align-items-center col-12 col-md-3 d-flex justify-content-end">
                    <IconButton
                        onClick={e => setEditForm(true)}
                        className={'p-2'}>
                        <EditOutlinedIcon/>
                    </IconButton>
                    <IconButton
                        onClick={e => removeItem(props.dishe.id)}
                        className={'p-2'}>
                        <DeleteOutlinedIcon/>
                    </IconButton>
                </div>
            </div>
        </div>
    )

}





