import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import 'antd/dist/antd.css';
import AdminNavComponent from '../../components/AdminNavComponent/AdminNavComponent';
import './SPDashboardPageComponent.scss';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CountUp from 'react-countup';
import Box from '@mui/material/Box';

import { getServiceproviders } from '../../services/AuthService';

const SPDashboardPageComponent = () => {
  const [serviceproviders, setServiceproviders] = useState([]);

  useEffect(() => {
    GetServiceproviders();
  }, []);

  const GetServiceproviders = async () => {
    try {
      const response = await getServiceproviders();
      console.log(response.data.data);
      setServiceproviders(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <AdminNavComponent />
      <div className="admincategory">
        <div className="service_header">
          {/* <Table
                    columns={columns}
                    dataSource={data}
                /> */}
          <p>All Service Providers</p>
        </div>
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
                      <th scope="col">Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Mail</th>
                      <th scope="col">Reviews</th>
                      <th scope="col">Approved Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceproviders.map((user) => (
                      <tr key={user._id}>
                        <td data-label="Name">
                          <h6>
                            <Link to={`/user/${user._id}`} className="linkuser"  style={{color: 'black' ,textDecoration: 'none'}}>
                              {user.serviceProviderID.name}
                            </Link>
                          </h6>
                        </td>
                        <td data-label="batch">
                          <h6>{` ${user.categoryID.name}`}</h6>
                        </td>
                        <td data-label="batch">
                          <h6>{user.serviceProviderID.email}</h6>
                        </td>
                        <td data-label="batch">
                          <h6>4.2</h6>
                        </td>
                        <td data-label="batch">
                          <h6>{user.isApprovedStatus ? "Pending":"Approved"}</h6>
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

export default SPDashboardPageComponent;
