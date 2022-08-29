import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { HeadingRegister } from '../Register/register.style'
import axios from 'axios'
import { baseURL, originalURL } from '../../constants'

export default function Login() {
  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem('authenticated')

  useEffect(() => {
    if (isAuthenticated === 'true') {
      navigate('/admin/users')
    }
  })

  const handleLogin = async (data) => {
    try {
      axios
        .post(`${originalURL}/authenticate`, {
          username: data.username,
          password: data.password
        })
        .then((res) => {
          localStorage.setItem('authenticated', true)
          message.info('Đăng nhập thành công')
          navigate('/admin/users')
        })
        .catch((error) => {
          message.error('Username hoặc mật khẩu không đúng')
        })
    } catch (error) {}
  }

  return (
    <div className="w-1/4 p-6 mx-auto mt-24 border rounded-md bg-slate-200">
      <h1>ĐĂNG NHẬP</h1>
      <div>
        <Form
          name="basic"
          labelCol={{
            span: 6
          }}
          wrapperCol={{
            span: 16
          }}
          onFinish={handleLogin}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập username!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!'
              }
            ]}
          >
            <Input.Password />
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
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
