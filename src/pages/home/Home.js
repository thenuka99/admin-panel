import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import "./home.scss";
import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CountUp from 'react-countup';

const Home = () => {
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
              <span className="counter"> <CountUp duration={5} end={230} /></span>
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
              <span className="counter"><CountUp duration={5} end={54} /></span>
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
              <span className="counter"><CountUp duration={5} end={740} /></span>
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
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default Home;
