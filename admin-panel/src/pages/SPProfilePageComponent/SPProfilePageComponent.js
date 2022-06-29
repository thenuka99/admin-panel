import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './SPProfilePageComponent.css';
import profile from '../../assets/User.jpg';
import { Form } from 'antd';
import { Label } from 'bizcharts';
import LetteredAvatar from 'react-lettered-avatar';
import { Rate } from 'antd';
import AdminNavComponent from '../../components/AdminNavComponent/AdminNavComponent';

import { getServiceProvider, getUser } from '../../services/AuthService';


function SPProfilePageComponent() {
  const { spID } = useParams();
  const [serviceprovider, setServiceProvider] = useState([]);

  useEffect(() => {
    GetServiceProvider();
    console.log(spID);
  }, [spID]);


  const GetServiceProvider = async () => {
    try {
      const response = await getServiceProvider(spID);
      //console.log(response.data.data);
      setServiceProvider(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div>
      <AdminNavComponent />
      <div>
        <div className="header">
          <h1>Service Provider Profile</h1>
        </div>
        <div class="card-container">
          <div class="upper-container">
            <div class="image-container">
              {/* <img src={profile} /> */}
              {/* <LetteredAvatar name={`${serviceprovider.serviceProviderID.name}`}size={100} className="avatar" /> */}
            </div>
          <Rate disabled value={4.5} />
          </div>
          <div class="lower-container">
            <div>
              <Form>
                <label for="username">Service Provider Name</label>
                {/* <input type="text" id="fname" name="fname"></input><br/> */}
                <h2 class="status">{serviceprovider.serviceProviderID.name}</h2>
                <label for="useremail">Service Provider Email</label>
                <h2 class="status">{serviceprovider.serviceProviderID.email}</h2>
                <label for="useremail">Service Category</label>
                <h2 class="status">{serviceprovider.serviceProviderID.email}</h2>
                <label for="userlocation">Approved Status</label>
                <h2 class="status">{serviceprovider.isApprovedStatus ? "Approved":"Reject"}</h2>
                <label for="userlocation">Service Provider City</label>
                <h2 class="status">{serviceprovider.serviceProviderID.city}</h2>
                

              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SPProfilePageComponent;
