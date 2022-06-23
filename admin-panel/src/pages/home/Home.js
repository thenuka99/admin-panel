import React, { useEffect, useState} from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CountUp from 'react-countup';
import { getUsers, getServiceproviders,getAppointments } from '../../services/AuthService';

const Home = () => {

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

  const GetAppointments= async () => {
    try {
      const response = await getAppointments();
      console.log(response.data.data);
      setAppointments(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />

        <div className="widgets">

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

        </div>

        <div className="charts">
          
        </div>
      </div>
    </div>
  );
};

export default Home;
