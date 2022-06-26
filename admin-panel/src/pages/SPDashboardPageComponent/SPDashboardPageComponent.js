import React, { useState } from 'react'
import { Space, Table, Tag } from 'antd';
import 'antd/dist/antd.css';
import AdminNavComponent from '../../components/AdminNavComponent/AdminNavComponent';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
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
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (tags) => (
            <span>
                {tags.map((tag) => {
                    let color = tag.length > 11 ? 'geekblue' : tag.length > 9 ?'green': tag.length > 7 ?'volcano': 'purple';

                    if (tag === 'loser') {
                        color = 'volcano';
                    }

                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Approve</a>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['painter'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['full stack developer'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['teacher'],
    },
    {
        key: '3',
        name: 'Joe white',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['plumber'],
    },
    {
        key: '3',
        name: 'kim Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['wall artist'],
    },
];

const SPDashboardPageComponent = () => {
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

export default SPDashboardPageComponent