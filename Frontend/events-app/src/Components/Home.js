import React, { useEffect,useState } from 'react';
import { Card, Col, Row,Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate=useNavigate();
    const [eventList,setEventList]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const headers = {
              "Content-type": "application/json",
            };
    
            const response = await axios.get('https://hylrlhm638.execute-api.us-east-1.amazonaws.com/dev/get-all', { headers });
            
            console.log(response); // Make sure to access the data property of the response
            // const eventListRes = JSON.parse(response.data)
            setEventList(response.data);
            console.log(eventList)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData(); // Call the async function within useEffect
    
      }, []);
      const handleViewDetails=(eventId)=>{
        navigate(`/event/${eventId}`)
      }
    return (
    <div>
  <Row gutter={16}>
  {eventList && eventList.map((element) => (
  <Col span={8} key={element.eventId}>
    <Card title={element.eventName} bordered={false}>
      {element.description}
      <Button type="primary" onClick={() => handleViewDetails(element.eventId)}>
        View Details
      </Button>
    </Card>
  </Col>
))}
  </Row>
  </div>
);
};
export default Home;