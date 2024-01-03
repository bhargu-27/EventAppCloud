import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EventPage = (props) => {
    const {eventId} = useParams();
    const [isUserAlreadyRegistered,setUserRegistered]=useState(false);
    const [eventDetails,setEventDetails]=useState({
        eventId:'1',
        eventName: 'Sample Event',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: '2023-12-01',
        location: 'Sample Location',
        contactNumber: '123-456-7890',
        creatorEmail: 'sample@example.com',
      })
      useEffect(() => {
        const fetchData = async () => {
          try {
            const headers = {
                "Content-type": "application/json",
            };
            const responseData = await axios.get(`https://hylrlhm638.execute-api.us-east-1.amazonaws.com/dev/get-event?eventId=${eventId}`,headers);
            setEventDetails(responseData.data);
            console.log(eventDetails)
            if(responseData.data.participants){
            for(const participant of responseData.data.participants){
                console.log(participant)
                if(participant==sessionStorage.getItem("userEmail")){
                    console.log(participant)
                    setUserRegistered(true);
                }
            }
            }
            console.log(isUserAlreadyRegistered)
            console.log(sessionStorage.getItem("userEmail"))
            console.log(eventDetails.creatorEmail)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData(); // Call the async function within useEffect
    
      }, []);
    const registerForEvent=async()=>{
        console.log(sessionStorage.getItem("userEmail"))
        const eventObject = {
            eventId:eventDetails.eventId,
            userEmail:sessionStorage.getItem("userEmail")
        }
        const headers = {
            "Content-type": "application/json",
        };
        const res = await axios.post(`https://hylrlhm638.execute-api.us-east-1.amazonaws.com/dev/register-event`,eventObject,headers);
        if(res.status==200){
            toast.success('Success!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000, // You can adjust the duration the toast stays visible (in milliseconds)
              });
        }
    }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Card title={eventDetails.eventName}>
        <p>Description: {eventDetails.description}</p>
        <p>Date: {eventDetails.time}</p>
        <p>Location: {eventDetails.location}</p>
        <p>Contact Number: {eventDetails.contactNumber}</p>
        <p>Contact Email: {eventDetails.creatorEmail}</p>

        {eventDetails.creatorEmail !== sessionStorage.getItem("userEmail") ? (
                isUserAlreadyRegistered ? (
                    <p>You have already registered for this event</p>
                ) : (
                    <Button type="primary" onClick={registerForEvent} block>
                        Register
                    </Button>
                )
            ) : null}
      </Card>
    </div>
    <ToastContainer/>
    </div>
  );
};

export default EventPage;