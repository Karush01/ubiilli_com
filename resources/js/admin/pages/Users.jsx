import React, {useState, useEffect} from 'react';
import Loc from '@locAdmin';
import {Table, Tag, Input, Button, Drawer} from 'antd';
import {GET_USERS_LIST} from '@queriesAdmin/user';
import {useQuery} from "@apollo/client";
import scrollToComponent from 'react-scroll-to-component';
import {SearchOutlined, EyeOutlined} from '@ant-design/icons';
import UserActions from '@modulesAdmin/UserActions';
import {fetchingData} from '@appAdmin';

const initialState = {searchText: '', searchedColumn: ''};

export default (props) => {

    const getColumnSearchProps = (dataIndex) => {

        return ({
                filterIcon: filtered => <SearchOutlined/>,
                filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                    <div style={{padding: 8}}>
                        <Input
                            placeholder={Loc.admin.enter_word}
                            value={selectedKeys}
                            onChange={e => setSelectedKeys(e.target.value)}
                            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            style={{width: 188, marginBottom: 8, display: 'block'}}
                        />
                        <Button
                            type="primary"
                            icon={<SearchOutlined/>}
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            size="small"
                            className="mr-2"
                            style={{width: 90}}
                        >
                            {Loc.admin.search}
                        </Button>
                        <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                            {Loc.admin.reset}
                        </Button>
                    </div>
                )
            }
        )
    };

    const [search, setSearch] = useState(initialState);

    const [activeUserId, setActiveUserId] = useState(undefined);

    const [columns] = useState([
        {
            title: Loc.admin.users.id,
            dataIndex: 'id',
            align: "center",
            sorter: true,
            ellipsis: true,
            width: '10%',
            render: (text, record) => (
                <b>{record.id}</b>
            )
        },
        {
            title: Loc.admin.users.name,
            dataIndex: 'name',
            align: "center",
            ellipsis: true,
            width: '20%',
            render: (text, record) => (
                <span>{record.first_name} {record.last_name}</span>
            )
        },
        {
            title: Loc.admin.users.email,
            dataIndex: 'email',
            align: "center",
            ellipsis: true,
            ...getColumnSearchProps('email'),
            width: '20%',
            render: (text, record) => (
                <span>{record.email}</span>
            )
        },
        {
            title: Loc.admin.users.register_date,
            dataIndex: 'created_at',
            align: "center",
            sorter: true,
            ellipsis: true,
            width: '20%',
            render: (text, record) => (
                <b>{record.registerDate}</b>
            )
        },
        {
            title: Loc.admin.users.status,
            dataIndex: 'status',
            align: "center",
            ellipsis: true,
            filters: [
                {text: Loc.admin.statuses.active, value: true},
                {text: Loc.admin.statuses.block, value: false}
            ],
            width: '15%',
            render: (text, record) => (
                <Tag
                    className={'text-lowercase has-color status-' + (record.active ? 'active' : 'block')}>{record.active ? Loc.admin.statuses.active : Loc.admin.statuses.block}</Tag>

            )
        },
        {
            title: Loc.admin.users.action,
            dataIndex: 'id',
            align: "center",
            ellipsis: true,
            width: '15%',
            render: (text, record) => (
                <Button
                    onClick={e => setActiveUserId(record.id)}
                    type="primary"
                    icon={<EyeOutlined/>}/>
            )
        }
    ]);

    const [request, setRequest] = useState({});

    const {loading, error, data} = useQuery(GET_USERS_LIST, {
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

        scrollToComponent(document.getElementById('users-table'), {offset: -30, align: 'top', duration: 300});


    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {

        confirm();
        setSearch({
            searchText: selectedKeys,
            searchedColumn: dataIndex,
        })
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearch({...initialState});
    };

    useEffect(() => {

        if (!_.isUndefined(props.match.params.id))
            setActiveUserId(props.match.params.id);

    }, []);

    return (
        <div className="row ml-0 mr-0">

            <Drawer
                title={Loc.admin.user_no + activeUserId}
                placement="right"
                width={'80%'}
                closable={true}
                visible={!_.isUndefined(activeUserId)}
                getContainer={false}
                className={'h-100 position-fixed'}
                onClose={e => setActiveUserId(undefined)}
            >
                {!_.isUndefined(activeUserId) &&
                <UserActions
                    userId={activeUserId}/>
                }
            </Drawer>

            <div
                id={'users-table'}
                className="col-12">
                <Table
                    rowKey={(record, index) => index}
                    size="small"
                    className={'users-table'}
                    onChange={handleTableChange}
                    dataSource={!_.isUndefined(data) ? data.getUsersList.items : []}
                    loading={loading}
                    pagination={!_.isUndefined(data) ? Object.assign({pageSize: 20}, {total: data.getUsersList.itemsCount.itemsCount}) : {pageSize: 20}}
                    columns={columns}/>
            </div>
        </div>
    )

}





