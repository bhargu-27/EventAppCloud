import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LogIn = () => {
  const navigate=useNavigate();
  const onFinish = async(values) => {
    console.log('Received values of form: ', values);
    const bodyData={
      emailId:values.email,
      password:values.password
    }
    const headers = {
      "Content-type": "application/json",
  };
    const response = await axios.post('https://hylrlhm638.execute-api.us-east-1.amazonaws.com/dev/login',bodyData,headers);
    if(response.status==200){
      sessionStorage.setItem("userEmail",values.email);
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
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="http://localhost:3000/signup">register now!</a>
      </Form.Item>
    </Form>
    <ToastContainer/>
    </div>
  );
};
export default LogIn;