import React, { useState } from 'react'
import { Space, Table, Tag } from 'antd';
import 'antd/dist/antd.css';
import AdminNavComponent from '../../components/AdminNavComponent/AdminNavComponent';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
];
const UserDashboardPageComponent = () => {
    return (
        <div>
            <AdminNavComponent />
            <div className='admincategory'>
                <Table
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </div>
    )
}

export default UserDashboardPageComponent