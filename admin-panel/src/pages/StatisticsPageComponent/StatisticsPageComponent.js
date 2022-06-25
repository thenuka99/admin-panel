/*eslint-disable */
import React, { useEffect, useState } from 'react';
import './StatisticsPageComponent.scss';
import "./widget.scss";
import AdminNavComponent from '../../components/AdminNavComponent/AdminNavComponent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CountUp from 'react-countup';
import Box from '@mui/material/Box';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { getUsers, getServiceproviders, getAppointments } from '../../services/AuthService';

function StatisticsPageComponent() {

    const [users, setUsers] = useState([]);
    const [serviceproviders, setServiceproviders] = useState([]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        GetUsers();
        GetServiceproviders();
        GetAppointments();
    }, []);

    const GetUsers = async () => {
        try {
            const response = await getUsers();
            console.log(response.data.data);
            setUsers(response.data.data);
        } catch (e) {
            console.log(e);
        }
    };

    const GetServiceproviders = async () => {
        try {
            const response = await getServiceproviders();
            console.log(response.data.data);
            setServiceproviders(response.data.data);
        } catch (e) {
            console.log(e);
        }
    };

    const GetAppointments = async () => {
        try {
            const response = await getAppointments();
            console.log(response.data.data);
            setAppointments(response.data.data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <AdminNavComponent />
            <div className='StatisticsPage'>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} md={4} lg={3}>
                            {/* clients */}
                            <div className="widget">
                                <div className="left">
                                    <span className="title">CLIENTS</span>
                                    <span className="counter"> <CountUp duration={5} end={users.length} /></span>
                                    <span className="link">See all clients</span>
                                </div>
                                <div className="right">
                                    <div className="percentage positive"></div>
                                    <PersonOutlinedIcon
                                        className="icon"
                                        style={{
                                            color: "crimson",
                                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                                        }}
                                    />
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} md={4} lg={3}>
                            {/* service providers */}
                            <div className="widget">
                                <div className="left">
                                    <span className="title">SERVICE PROVIDERS</span>
                                    <span className="counter"><CountUp duration={5} end={serviceproviders.length} /></span>
                                    <span className="link">See all service providers</span>
                                </div>
                                <div className="right">
                                    <div className="percentage positive"></div>
                                    <PersonOutlinedIcon
                                        className="icon"
                                        style={{
                                            color: "purple",
                                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                                        }}
                                    />
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} md={4} lg={3}>
                            {/* appointments */}
                            <div className="widget">
                                <div className="left">
                                    <span className="title">APPOINTMENTS</span>
                                    <span className="counter"><CountUp duration={5} end={appointments.length} /></span>
                                    <span className="link">View all appointments</span>
                                </div>
                                <div className="right">
                                    <div className="percentage positive"></div>
                                    <ShoppingCartOutlinedIcon
                                        className="icon"
                                        style={{
                                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                                            color: "goldenrod",
                                        }}
                                    />
                                </div>
                            </div>

                        </Grid>

                        <Grid item xs={12} md={4} lg={3}>
                            {/* earnings */}
                            <div className="widget">
                                <div className="left">
                                    <span className="title"> EARNINGS</span>
                                    <span className="counter">Rs <CountUp duration={5} end={15300} /></span>
                                    <span className="link">View all earnings</span>
                                </div>
                                <div className="right">
                                    <div className="percentage positive"></div>
                                    <div className="percentage positive">
                                        <MonetizationOnOutlinedIcon
                                            className="icon"
                                            style={{
                                                backgroundColor: "rgba(0, 128, 0, 0.2)",
                                                color: "green",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Grid>



                        {/* user list */}
                        <Grid item xs={12}>
                            <div className="userlist" id='userlist'>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Typography component="header" variant="h6"  >
                                        <Box sx={{ textAlign: 'center', m: 1 }}>Users list</Box>
                                    </Typography>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">type</th>
                                                <th scope="col">Mail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map((user) => (
                                                    <tr key={user._id}>
                                                        <td data-label="Name">
                                                            <h6><Link to={`/user/${user._id}`} className='linkuser'>{user.name}</Link></h6>
                                                        </td>
                                                        <td data-label="batch"><h6>{` ${user.userType}`}</h6></td>
                                                        <td data-label="batch"><h6>{user.email}</h6></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </Paper>
                            </div>
                        </Grid>


                    </Grid>
                </Container>
            </div>
        </>
    );
}

export default StatisticsPageComponent;
