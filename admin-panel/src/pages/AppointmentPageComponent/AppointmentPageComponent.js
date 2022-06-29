import React, { useState, useEffect } from 'react';
import AdminNavComponent from '../../components/AdminNavComponent/AdminNavComponent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import './AppointmentPageComponent.scss';
import { getAppointments } from '../../services/AuthService';
import { getDateTime } from '../../helpers/TimeHelper';
import { Tag } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';

const AppointmentPageComponent = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
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

  return (
    <div>
      <AdminNavComponent />
      <div className="admincategory">
        <div className="appointment_header">
          <p>All Appointments</p>
        </div>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12} id="users">
            <div className="userlist" id="userlist">
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Client's Name</th>
                      <th scope="col">Service Provider's Name</th>
                      <th scope="col">Service Category</th>
                      <th scope="col">Price</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
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
                        <td data-label="status">
                          <h6>{!appointment.serviceisAcceptedStatus ?
                            <Tag icon={<SyncOutlined spin />} color="warning">Pending</Tag>
                            :
                            !appointment.serviceAcceptedStatus ?
                              <Tag icon={<CheckCircleOutlined />} color="success">Approved</Tag>
                              :
                              <Tag icon={<CloseCircleOutlined />} color="error">Rejected</Tag>}</h6>
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
