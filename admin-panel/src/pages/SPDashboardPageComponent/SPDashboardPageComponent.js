import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import AdminNavComponent from '../../components/AdminNavComponent/AdminNavComponent';
import './SPDashboardPageComponent.scss';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { Tag } from 'antd';
import { getServiceproviders, updateServiceprovider } from '../../services/AuthService';
import SearchBarComponent from '../../components/SearchBarComponent/SearchBarComponent';
import LetteredAvatar from 'react-lettered-avatar';
import { NavLink } from 'react-router-dom';


const SPDashboardPageComponent = () => {
  const [serviceproviders, setServiceproviders] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(() => {
    GetServiceproviders();
  }, []);

  const GetServiceproviders = async () => {
    try {
      const response = await getServiceproviders();
      console.log(response.data.data);
      setServiceproviders(response.data.data);
      //approve=true;
    } catch (e) {
      console.log(e);
    }
  };

  const handleServiceProvidersSort = () => {
    return serviceproviders.filter((user) => {
      if (search == '') {
        return serviceproviders;
      } else if (
        user.serviceProviderID.name
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
      ) {
        return serviceproviders;
      }
    });
  };

  const handleUpdateStatus = async (spId, isApprovedStatus) => {

    try {
      const response = await updateServiceprovider({
        id: spId,
        isApprovedStatus: isApprovedStatus,
      });
      console.log(response);
      window.location.reload(false);
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
        <SearchBarComponent
          text="Search Service Providers"
          search={search}
          setSearch={setSearch}
        />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12} id="users">
            <div className="userlist" id="userlist">
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <table>
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Mail</th>
                      <th scope="col">Address</th>
                      <th scope="col">Approved Status</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {handleServiceProvidersSort().map((user) => (
                      <tr key={user._id}>
                        <td data-label="batch">
                          <LetteredAvatar name={`${user.serviceProviderID.name}`} size={45} />
                        </td>
                        <td data-label="Name">
                          <h6>
                            <NavLink
                              to={`/serviceproviderprofile/${user._id}`}
                              className="linkuser"
                              style={{ color: 'black', textDecoration: 'none' }}
                            >
                              {user.serviceProviderID.name}
                            </NavLink>
                          </h6>
                        </td>
                        <td data-label="batch">
                          <h6>{` ${user.categoryID.name}`}</h6>
                        </td>
                        <td data-label="batch">
                          <h6>{user.serviceProviderID.email}</h6>
                        </td>
                        <td data-label="batch">
                          <h6>{user.serviceProviderID.city}</h6>
                        </td>
                        <td data-label="batch">
                          <h6>
                            {user.isApprovedStatus ?
                              <Tag color="green">Approved</Tag>
                              :
                              <Tag color="red">Rejected</Tag>
                            }
                          </h6>
                        </td>
                        {!user.isApprovedStatus ?
                          <td data-label="batch">
                            <button className='status_approve_button' onClick={() => handleUpdateStatus(user._id, true)}>Approve</button>
                          </td>
                          :
                          <td data-label="batch">
                            <button className='status_decline_button' onClick={() => handleUpdateStatus(user._id, false)}>Decline</button>
                          </td>
                        }

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
