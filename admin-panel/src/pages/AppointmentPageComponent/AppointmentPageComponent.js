import React, { useState, useEffect } from 'react';
import AdminNavComponent from '../../components/AdminNavComponent/AdminNavComponent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CountUp from 'react-countup';
import Box from '@mui/material/Box';
import './AppointmentPageComponent.scss';
import { getAppointments, getServiceprovider } from '../../services/AuthService';
import { getDateTime } from '../../helpers/TimeHelper';

const AppointmentPageComponent = () => {
  const [appointments, setAppointments] = useState([]);
  //const [serviceprovider, setServiceprovider] = useState([]);

  useEffect(() => {
    //loadServiceProvider();
    GetAppointments();
    
  }, []);

  const GetAppointments = async () => {
    try {
      const response = await getAppointments();
      console.log(response.data.data);
      setAppointments(response.data.data);
      console.log(appointments._id);
    } catch (e) {
      console.log(e);
    }
  };

  // const loadServiceProvider = async (id) => {
  //   try {
  //     //console.log(id);
  //     const response = await getServiceprovider(id);
  //     //console.log(response.data.data);
  //     setServiceprovider(response.data.data);
     
      
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   //return (serviceprovider.serviceProviderID.name);
    
  // };

  return (
    <div>
      <AdminNavComponent />
      <div className="admincategory">
        <div className="appointment_header">
          {/* <Table
                    columns={columns}
                    dataSource={data}
                /> */}
          <p>All Appointments</p>
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
                      <th scope="col">Client's Name</th>
                      <th scope="col">Service Provider's Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Service Category</th>
                      <th scope="col">Price</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment._id}>
                        <td data-label="Client's Name">
                          <h6>
                            {appointment.client.name && appointment.client.name}
                          </h6>
                        </td>
                        <td data-label="Service Provider's Name">
                          <h6>
                            {appointment.serviceProvider.serviceProviderID.name}
                          </h6>
                        </td>
                        <td data-label="Address">
                          <h6>{appointment.address}</h6>
                        </td>
                        <td data-label="Service Category">
                          <h6>{appointment.serviceCategory.name}</h6>
                        </td>

                        <td data-label="Price">
                          <h6>Rs. {appointment.price && appointment.price}</h6>
                        </td>
                        <td data-label="Date">
                          <h6>
                            {appointment.date && getDateTime(appointment.date)}
                          </h6>
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

export default AppointmentPageComponent;
