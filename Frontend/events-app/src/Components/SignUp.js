import React from 'react';
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import './../App.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
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
const SignUp =  () => {
  const navigate=useNavigate();
  const [form] = Form.useForm();
  const onFinish = async(values) => {
    console.log('Received values of form: ', values);
    const bodyData={
      emailId:values.email,
      password:values.password,
      city:values.city,
      gender:values.gender,
      phone:values.phone
    }
    const headers = {
      "Content-type": "application/json",
  };
    const response = await axios.post('https://hylrlhm638.execute-api.us-east-1.amazonaws.com/dev/signup',bodyData,headers);
    console.log(response); 
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
  {...formItemLayout}
  form={form}
  name="register"
  onFinish={onFinish}
  style={{
    maxWidth: 600,
  }}
  scrollToFirstError
  className="centered-form"
>
      <Form.Item
        name="email"
        label="E-mail"
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
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="city"
        label="City"
        rules={[
          {
            type: 'string',
            required: true,
            message: 'Please enter your city',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="phone"
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
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: 'Please select gender!',
          },
        ]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

     

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    <ToastContainer/>
    </div>
  );
};
export default SignUp;