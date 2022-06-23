import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const UserDashboard = () => {
  return (
    <div className="UserDashboard">
      <Sidebar />
      <div className="userDashboardContainer">
        <Navbar />
      </div>
    </div>
  );
};

export default UserDashboard;
