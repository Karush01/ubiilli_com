import React, {useState} from 'react';
import {Table, Radio, Popover} from 'antd';
import Loc from '@locAdmin';
import routes from '@routes';
import useNotification from '@hooksAdmin/notificationHooks';
import {PLACE_STATUS_HANDLER} from '@mutationsAdmin/place';
import {useMutation} from "@apollo/client";


export default (props) => {

    const {setErrorHandled, successNotification} = useNotification();

    const [placeStatusHandler, {loading: changeLoading}] = useMutation(PLACE_STATUS_HANDLER);

    const changeStatus = async (id, value) => {

        await placeStatusHandler({
            variables: {
                id: id,
                status: value
            }
        }).then(response => {

            successNotification(response.data.placeStatusHandler.message)


        }).catch(error => {
            setErrorHandled(error.graphQLErrors);
        });

    };

    const [columns, setColumns] = useState([
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
                <Popover content={<img width={250} src={record.picture.place_medium_picture}/>}>
                    <a
                        target={'_blank'}
                        href={_sharedData.siteLink + '/' + routes.place + '/' + record.slug}
                        className={'cursor-default text-body'}>{record.name}</a>
                </Popover>
            )
        },
        {
            title: Loc.admin.places.status,
            dataIndex: 'status',
            align: "center",
            ellipsis: true,
            width: '15%',
            render: (text, record) => (
                <Radio.Group
                    onChange={e => changeStatus(record.id, e.target.value)}
                    defaultValue={record.status}
                    size="small">
                    <Radio.Button value={true}>{Loc.admin.statuses.active}</Radio.Button>
                    <Radio.Button value={false}>{Loc.admin.statuses.block}</Radio.Button>
                </Radio.Group>

            )
        }
    ]);

    return (
        <div className="row">
            <div className="col-12 pl-0 pr-0">
                <Table
                    loading={changeLoading}
                    columns={columns}
                    dataSource={props.places}
                    pagination={false}
                    size="small"
                    rowKey={record => record.id}
                />
            </div>
        </div>
    )

}
