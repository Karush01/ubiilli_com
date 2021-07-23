import React, { useState } from 'react';
import Loc from '@locAdmin';
import { Table, Radio, Popover, Badge, Button, Popconfirm } from 'antd';
import { GET_PLACES_LIST } from '@queriesAdmin/place';
import { useQuery, useMutation } from "@apollo/client";
import scrollToComponent from 'react-scroll-to-component';
import routes from "@routes";
import routesAdmin from "@routesAdmin";
import useNotification from '@hooksAdmin/notificationHooks';
import { PLACE_STATUS_HANDLER, PLACE_REMOVE_HANDLER } from '@mutationsAdmin/place';
import { fetchingData } from '@appAdmin';
import { Link } from 'react-router-dom';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';


export default (props) => {

    const { setErrorHandled, successNotification } = useNotification();

    const [placeStatusHandler, { loading: changeLoading }] = useMutation(PLACE_STATUS_HANDLER);

    const [placeRemoveHandler, { loading: removeLoading }] = useMutation(PLACE_REMOVE_HANDLER);

    const [clickedIds, setClickedIds] = useState({
        items: [],
        removedItems: []
    });

    const changeStatus = async (id, value) => {

        await placeStatusHandler({
            variables: {
                id: id,
                status: value
            }
        }).then(response => {

            successNotification(response.data.placeStatusHandler.message);

            const newItems = { ...clickedIds };

            newItems.items.push(id);

            setClickedIds(newItems)


        }).catch(error => {
            setErrorHandled(error.graphQLErrors);
        });

    };

    const removePlace = async (id) => {

        await placeRemoveHandler({
            variables: {
                id: id
            }
        }).then(response => {

            successNotification(response.data.placeRemoveHandler.message);

            const newItems = { ...clickedIds };

            newItems.removedItems.push(id);

            setClickedIds(newItems)


        }).catch(error => {
            setErrorHandled(error.graphQLErrors);
        });

    };

    const [columns] = useState([
        {
            title: Loc.admin.places.id,
            dataIndex: 'id',
            align: "center",
            ellipsis: true,
            width: '5%',
            render: (text, record) => (
                <b>{record.id}</b>
            )
        },
        {
            title: Loc.admin.places.name,
            dataIndex: 'name',
            align: "center",
            ellipsis: true,
            width: '20%',
            render: (text, record) => (
                <Popover content={<img width={250} src={record.picture.place_medium_picture} />}>
                    <a
                        target={'_blank'}
                        href={_sharedData.siteLink + '/' + routes.hashedPlace + '/' + record.hashedUrl}
                        className={'cursor-default text-body'}>{record.name}</a>
                </Popover>
            )
        },
        {
            title: Loc.admin.places.owner,
            dataIndex: 'user',
            align: "center",
            ellipsis: true,
            width: '10%',
            render: (text, record) => (

                <Link
                    to={'/' + routesAdmin.users.index + '/' + record.user.id}
                    className={'cursor-default text-body'}>{record.user.first_name} {record.user.last_name}</Link>

            )
        },
        {
            title: Loc.admin.places.status,
            dataIndex: 'status',
            align: "center",
            ellipsis: true,
            width: '15%',
            render: (text, record) => (
                <Badge
                    className={'badge-in-moderation ' + ((!_.isNull(record.status) || clickedIds.items.includes(record.id)) ? 'hidden-badge' : '')}
                    count={Loc.admin.statuses.waiting}
                >
                    <Radio.Group
                        onChange={e => changeStatus(record.id, e.target.value)}
                        defaultValue={record.status} size="small">
                        <Radio.Button value={true}>{Loc.admin.statuses.active}</Radio.Button>
                        <Radio.Button value={false}>{Loc.admin.statuses.block}</Radio.Button>
                    </Radio.Group>
                </Badge>
            )
        },
        {
            title: Loc.admin.places.action,
            align: "center",
            ellipsis: true,
            width: '15%',
            render: (text, record) => (
                <Popconfirm
                    title={Loc.admin.places.remove_place}
                    onConfirm={(e) => {
                        removePlace(record.id)
                    }}
                    okText={Loc.admin.yes}
                    cancelText={Loc.admin.no}
                >
                    <Button
                        icon={removeLoading ? <LoadingOutlined /> : <DeleteOutlined />}
                        size={'small'} danger>{Loc.admin.remove}</Button>
                </Popconfirm>
            )
        }
    ]);

    const [request, setRequest] = useState({});

    const { loading, error, data } = useQuery(GET_PLACES_LIST, {
        variables: {
            request: request
        },
        fetchPolicy: fetchingData.noCache
    });

    const handleTableChange = (pagination, filters, sorter) => {

        const requestData = filters;

        requestData.page = pagination.current;

        if (!_.isUndefined(sorter.order)) {
            requestData.sort_order = sorter.order.slice(0, -3);
            requestData.sort_field = sorter.field;
        }

        setRequest(requestData);

        scrollToComponent(document.getElementById('places-table'), { offset: -30, align: 'top', duration: 300 });

    };


    return (
        <div className="row ml-0 mr-0">
            <div
                id={'places-table'}
                className="col-12">
                <Table
                    rowKey={(record, index) => index}
                    size="small"
                    rowClassName={(record, index) => {
                        return clickedIds.removedItems.includes(record.id) ? 'd-none' : '';
                    }}
                    className={'places-table'}
                    onChange={handleTableChange}
                    dataSource={!_.isUndefined(data) ? data.getPlacesList.items : []}
                    loading={loading || changeLoading}
                    pagination={!_.isUndefined(data) ? Object.assign({ pageSize: 20 }, { total: data.getPlacesList.itemsCount.itemsCount }) : { pageSize: 20 }}
                    columns={columns} />
            </div>
        </div>
    )

}





