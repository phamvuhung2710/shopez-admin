import { Button, Form, Input } from 'antd'
import React from 'react'
import { HeadingRegister } from './register.style'

export default function Register() {
  const handleRegister = async (data) => {
    const body = {
      email: data.email,
      password: data.password
    }
  }

  return (
    <div className="w-1/4 p-6 mx-auto mt-24 border rounded-md bg-slate-200">
      <HeadingRegister>ĐĂNG KÝ</HeadingRegister>
      <div>
        <Form
          name="basic"
          labelCol={{
            span: 6
          }}
          wrapperCol={{
            span: 16
          }}
          onFinish={handleRegister}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Họ tên"
            name="name"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập họ tên!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="mt-2 bg-[#00aefd]"
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
