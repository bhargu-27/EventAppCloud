import React from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker, TimePicker
} from 'antd';
import './../App.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
const { Option } = Select;


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const CreateEvent = () => {
    const navigate =useNavigate();
  const [form] = Form.useForm();
  const onFinish = async(values) => {
    console.log('Received values of form: ', values);
    const bodyData= {
        eventName:values.name,
        description:values.description,
        location:values.location,
        contactNumber:values.contactNumber,
        creatorEmail:sessionStorage.getItem("userEmail"),
        time:values.time
    }
    const headers = {
        "Content-type": "application/json"
    };
      const response = await axios.post('https://6v7684jwe3.execute-api.us-east-1.amazonaws.com/dev/create-event',bodyData,headers);
      if(response.status==200){
        toast.success('Success!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000, // You can adjust the duration the toast stays visible (in milliseconds)
        });
        navigate('/');
      } else{
        toast.error('Something went wrong!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000, // You can adjust the duration the toast stays visible (in milliseconds)
        });
      }
  };
  return (
    <div>
    <Form
  {...formItemLayout}
  form={form}
  name="create event"
  onFinish={onFinish}
  style={{
    maxWidth: 600,
  }}
  scrollToFirstError
  className="centered-form"
>
      <Form.Item
        name="name"
        label="Event Name"
        rules={[
          {
            required: true,
            message: 'Please input your E-mail!',
          },
            ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="description"
        rules={[
          {
            required: true,
            message: 'Please Enter Description!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="location"
        label="location"
        rules={[
          {
            type: 'string',
            required: true,
            message: 'Please enter city',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="contactNumber"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        name="time"
        label="Date & Time"
        rules={[
          {
            required: true,
            message: 'Please select date and time!',
          },
        ]}
      >
        <DatePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
        />
      </Form.Item>

     

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Create Event
        </Button>
      </Form.Item>
    </Form>
    <ToastContainer/>
    </div>
  );
};
export default CreateEvent;