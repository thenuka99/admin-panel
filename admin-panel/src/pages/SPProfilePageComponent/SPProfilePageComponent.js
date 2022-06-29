import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './SPProfilePageComponent.css';
import { Form } from 'antd';
import { Link } from 'react-router-dom';
import LetteredAvatar from 'react-lettered-avatar';
import AdminNavComponent from '../../components/AdminNavComponent/AdminNavComponent';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { getServiceProvider, getUser, getReviews } from '../../services/AuthService';
import Rating from '@mui/material/Rating';
import { getDateTime } from '../../helpers/TimeHelper';


const SPProfilePageComponent = () => {
  const { spID } = useParams();
  const [serviceprovider, setServiceProvider] = useState([]);
  const [user, setUser] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [starrating, setRating] = useState(0);

  useEffect(() => {
    GetServiceProvider();
    GetReviews();
  }, [spID]);

  useEffect(() => {
    Getuser();
  }, [serviceprovider]);

  useEffect(() => {
    CalRating();
  }, [reviews]);


  const GetServiceProvider = async () => {
    try {
      const response = await getServiceProvider(spID);
      console.log(response.data.data);
      setServiceProvider(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const Getuser = async () => {
    try {
      const response = await getUser(serviceprovider.serviceProviderID._id);
      console.log(response.data.data);
      setUser(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const GetReviews = async () => {
    try {
      const response = await getReviews(spID);
      console.log(response.data.data);
      setReviews(response.data.data);
    } catch (e) {
      console.log(e);
    }
  }


  const CalRating = () => {
    let rating = 0;
    reviews.map((review) => {
      rating += Math.ceil(review.starRating);
    })
    rating /= reviews.length
    rating = parseFloat(rating).toFixed(1)
    console.log(rating)
    setRating(rating)

  };

  return (
    <div>
      <AdminNavComponent />
      <div>
        <div className="header">
          <h1>Service Provider Profile</h1>
        </div>
        {
          starrating ?
            <div className="profile">
              <div class="card-container">
                <div class="upper-container">
                  <div class="image-container">
                    <LetteredAvatar name={`${user.name}`} size={100} className="avatar" />
                  </div>
                  <Rating name="half-rating-read" defaultValue={starrating} precision={0.5} readOnly />
                  <p>{`${starrating}/5`}</p>
                </div>
                <div class="lower-container">
                  <div>
                    <Form>
                      <label for="username">Service Provider Name</label>
                      <h2 class="status">{user.name}</h2>
                      <label for="useremail">Service Provider Email</label>
                      <h2 class="status">{user.email}</h2>
                      <label for="useremail">Service Provider ID</label>
                      <h2 class="status">{user._id}</h2>
                      <label for="useremail">Service Category</label>
                      <h2 class="status">{user.email}</h2>
                      <label for="userlocation">Approved Status</label>
                      <h2 class="status">{serviceprovider.isApprovedStatus ? "Approved" : "Reject"}</h2>
                      <label for="userlocation">Service Provider City</label>
                      <h2 class="status">{user.city}</h2>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
            :
            <></>
        }

        <div className="reviews">
          <h3 className='reviews_topic'>Reviews</h3>

          {
            reviews.map((review) => (
              <Card >
              {/* <Link to={`/user/${post.addedBy._id}`} className='post-avatar-name'> */}
              <CardHeader
                avatar={
                  <LetteredAvatar name={review.addedBy.name} size={50} className="avatar" />
                }
                title={review.addedBy.name}
                subheader={getDateTime(review.addedOn)}
              />
              {/* </Link> */}
              <CardContent>
                <Typography variant="h7" color="text.primary">{review.review}</Typography>
              </CardContent>
              <CardActions>
                <Typography variant="body2" color="text.secondary">
                {`${review.starRating}/5`}
                </Typography>
              </CardActions>
            </Card>
            ))
          }
        </div>

      </div>
    </div>
  );
}

export default SPProfilePageComponent;

