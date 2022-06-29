/*eslint-disable */
import React, { useEffect, useState } from "react";
import "./StatisticsPageComponent.scss";
import "./widget.scss";
import AdminNavComponent from "../../components/AdminNavComponent/AdminNavComponent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CountUp from "react-countup";
import Box from "@mui/material/Box";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

import {
  getUsers,
  getServiceproviders,
  getAppointments,
  loadCategories,
  getClients,
  getApproveAppointments,
  getRejectAppointments,
} from "../../services/AuthService";
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";
import LetteredAvatar from "react-lettered-avatar";

function StatisticsPageComponent() {
  const [users, setUsers] = useState([]);
  const [serviceproviders, setServiceproviders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [rejectAppointments, setRejectAppointments] = useState([]);
  const [approveAppointments, setApproveAppointments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [clients, setClients] = useState([]);
  const [sumEarning, setSumEarning] = useState(0);

  useEffect(() => {
    GetUsers();
    GetServiceproviders();
    GetAppointments();
    GetCategories();
    GetClients();
    GetApproveAppointments();
    GetRejectAppointments();
  }, []);

  useEffect(() => {
    Calearnings();
  }, [approveAppointments]);

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

  const GetApproveAppointments = async () => {
    try {
      const response = await getApproveAppointments();
      console.log(response.data.data);
      setApproveAppointments(response.data.data);
    } catch (e) {
      console.log(e);
    }
    Calearnings();
  };

  const GetRejectAppointments = async () => {
    try {
      const response = await getRejectAppointments();
      console.log(response.data.data);
      setRejectAppointments(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const GetCategories = async () => {
    try {
      const response = await loadCategories();
      console.log(response.data.data);
      setCategories(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const GetClients = async () => {
    try {
      const response = await getClients();
      console.log(response.data.data);
      setClients(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const Calearnings = () => {
    let earning = 0;
    rejectAppointments.map((appointment) => {
      earning += appointment.price;
    });
    console.log(earning);
    setSumEarning(earning);
  };

  return (
    <>
      <AdminNavComponent />
      <div className="StatisticsPage">
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
              {/* clients */}
              <div className="widget">
                <div className="left">
                  <span className="title">USERS</span>
                  <span className="counter">
                    {" "}
                    <CountUp duration={5} end={users.length} />
                  </span>
                  <HashLink
                    smooth
                    to="#users"
                    style={{ color: "black", textDecoration: "none" }}
                    className="admin_link"
                  >
                    <span className="link">See all users</span>
                  </HashLink>
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
              {/* clients */}
              <div className="widget">
                <div className="left">
                  <span className="title">CLIENTS</span>
                  <span className="counter">
                    <CountUp duration={5} end={clients.length} />
                  </span>
                  <NavLink
                    to="/client"
                    style={{ color: "black", textDecoration: "none" }}
                    className="admin_link"
                  >
                    <span className="link">See all clients</span>
                  </NavLink>
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
              {/* service providers */}
              <div className="widget">
                <div className="left">
                  <span className="title">SERVICE PROVIDERS</span>
                  <span className="counter">
                    <CountUp duration={5} end={serviceproviders.length} />
                  </span>
                  <NavLink
                    to="/serviceprovider"
                    style={{ color: "black", textDecoration: "none" }}
                    className="admin_link"
                  >
                    <span className="link">See all service providers</span>
                  </NavLink>
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
              {/* service providers */}
              <div className="widget">
                <div className="left">
                  <span className="title">SERVICE CATEGORIES</span>
                  <span className="counter">
                    <CountUp duration={5} end={categories.length} />
                  </span>
                  <NavLink
                    to="/category"
                    style={{ color: "black", textDecoration: "none" }}
                    className="admin_link"
                  >
                    <span className="link">See all service categories</span>
                  </NavLink>
                </div>
                <div className="right">
                  <div className="percentage positive"></div>
                  <CategoryOutlinedIcon
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
              {/* all appointments */}
              <div className="widget">
                <div className="left">
                  <span className="title">ALL APPOINTMENTS</span>
                  <span className="counter">
                    <CountUp duration={5} end={appointments.length} />
                  </span>
                  <NavLink
                    to="/appointment"
                    style={{ color: "black", textDecoration: "none" }}
                    className="admin_link"
                  >
                    <span className="link">View all appointments</span>
                  </NavLink>
                </div>
                <div className="right">
                  <div className="percentage positive"></div>
                  <BookOnlineOutlinedIcon
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
              {/* Approved appointments */}
              <div className="widget">
                <div className="left">
                  <span className="title">REJECTED APPOINTMENTS</span>
                  <span className="counter">
                    <CountUp duration={5} end={approveAppointments.length} />
                  </span>
                  <NavLink
                    to="/appointment"
                    style={{ color: "black", textDecoration: "none" }}
                    className="admin_link"
                  >
                    <span className="link">View all appointments</span>
                  </NavLink>
                </div>
                <div className="right">
                  <div className="percentage positive"></div>
                  <BookOnlineOutlinedIcon
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
              {/* reject appointments */}
              <div className="widget">
                <div className="left">
                  <span className="title">APPROVED APPOINTMENTS</span>
                  <span className="counter">
                    <CountUp duration={5} end={rejectAppointments.length} />
                  </span>
                  <NavLink
                    to="/appointment"
                    style={{ color: "black", textDecoration: "none" }}
                    className="admin_link"
                  >
                    <span className="link">View all appointments</span>
                  </NavLink>
                </div>
                <div className="right">
                  <div className="percentage positive"></div>
                  <BookOnlineOutlinedIcon
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
                  <span className="counter">
                    Rs <CountUp duration={5} end={sumEarning} />
                  </span>
                  <NavLink
                    to="/appointment"
                    style={{ color: 'black', textDecoration: 'none' }}
                    className="admin_link"
                  >
                    <span className="link">View all appointments</span>
                  </NavLink>
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
            <Grid item xs={12} id="users">
              <div className="userlist" id="userlist">
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Typography component="header" variant="h6">
                    <Box
                      sx={{
                        textAlign: "center",
                        fontSize: "28px",
                        fontWeight: "700",
                        color: "#003459",
                        paddingBottom: "20px",
                        m: 1,
                      }}
                    >
                      Users list
                    </Box>
                  </Typography>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">type</th>
                        <th scope="col">Mail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td data-label="batch">
                            <LetteredAvatar name={`${user.name}`} size={45} />
                          </td>
                          <td data-label="Name">
                            <h6>
                              <NavLink
                                to={`/clientprofile/${user._id}`}
                                className="linkuser"
                                style={{
                                  color: "rgba(0, 0, 0, 0.85)",
                                  textDecoration: "none",
                                }}
                              >
                                {user.name}
                              </NavLink>
                            </h6>
                          </td>
                          <td data-label="batch">
                            <h6>{` ${user.userType}`}</h6>
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
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default StatisticsPageComponent;
