import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './ClientProfilePageComponent.css';
import profile from '../../assets/User.jpg';
import { Form } from 'antd';
import { Label } from 'bizcharts';
import LetteredAvatar from 'react-lettered-avatar';
import { Rate } from 'antd';
import AdminNavComponent from '../../components/AdminNavComponent/AdminNavComponent';

import { getUser } from '../../services/AuthService';
function ClientProfilePageComponent() {
  const { userID } = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    GetUser();
    console.log(userID);

  }, []);

  const GetUser = async () => {
    console.log(userID);
    try {
      const response = await getUser(userID);
      console.log(response.data.data);
      setUser(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div>
      <AdminNavComponent />
      <div>
        <div className="header">
          <h1>User Profile</h1>
        </div>
        <div class="card-container">
          <div class="upper-container">
            <div class="image-container">
              {/* <img src={profile} /> */}
              <LetteredAvatar name={`${user.name}`}size={100} className="avatar" />
            </div>
          {(user.userType == "sp") && <Rate disabled defaultValue={4.5} />}
          </div>
          <div class="lower-container">
            <div>
              <Form>
                <label for="username"> User Name</label>
                {/* <input type="text" id="fname" name="fname"></input><br/> */}
                <h2 class="status">{user.name}</h2>
                <label for="userid">User Id</label>
                <h2 class="status">{user._id}</h2>
                <label for="usertype">User Type</label>
                <h2 class="status">{user.userType}</h2>
                <label for="useremail">User Email</label>
                <h2 class="status">{user.email}</h2>
                <label for="userlocation">User Location</label>
                <h2 class="status">{user.city}</h2>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProfilePageComponent;
