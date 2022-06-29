import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import 'antd/dist/antd.css';
import AdminNavComponent from '../../components/AdminNavComponent/AdminNavComponent';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CountUp from 'react-countup';
import Box from '@mui/material/Box';
import './UserDashboardPageComponent.scss';
import SearchBarComponent from '../../components/SearchBarComponent/SearchBarComponent';

import { getClients } from '../../services/AuthService';
import LetteredAvatar from 'react-lettered-avatar';
import { NavLink } from 'react-router-dom';

const UserDashboardPageComponent = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    GetClients();
  }, []);

  const GetClients = async () => {
    try {
      const response = await getClients();
      console.log(response.data.data);
      setClients(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClientsSort = () => {
    return clients
      .filter((user) => {
        if (search == '') {
          return clients;
        } else if (
          user.name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        ) {
          return clients;
        }
      });
  };

  return (
    <div>
      <AdminNavComponent />
      <div className="admincategory">
        <div className="client_header">
          {/* <Table
                    columns={columns}
                    dataSource={data}
                /> */}
          <p>All Clients</p>
        </div>
        <SearchBarComponent text="Search Clients"  search={search}
                setSearch={setSearch}/>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12} id="users">
            <div className="userlist" id="userlist">
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {/* <Typography component="header" variant="h6"  >
                                        <Box sx={{ textAlign: 'center', m: 1 }}>Users list</Box>
                                    </Typography> */}
                <table>
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Mail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {handleClientsSort().map((user) => (
                      <tr key={user._id}>
                         <td data-label="batch">
                         <LetteredAvatar name={`${user.name}`} size={45}/> 
                        </td>
                        <td data-label="Name">
                          <h6>
                            <NavLink
                              to={`/clientprofile/${user._id}`}
                              className="linkuser"
                              style={{ color: 'black', textDecoration: 'none' }}
                            >
                              {user.name}
                            </NavLink>
                          </h6>
                        </td>
                        <td data-label="batch">
                          <h6>{` ${user.city}`}</h6>
                        </td> 
                        <td data-label="batch">
                          <h6>{user.email}</h6>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Paper>
            </div>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default UserDashboardPageComponent;
