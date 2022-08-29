import { message } from 'antd'
import axios from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import { originalURL } from '../../constants'
import './style.css'

function Login() {
  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem('TOKEN')

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/users')
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    axios
      .post(`${originalURL}/authenticate`, {
        username: data.username,
        password: data.password
      })
      .then((res) => {
        // const role = res?.data?.roles[0]?.authority
        const token = res?.data?.token
        localStorage.setItem('TOKEN', token)

        const username = res?.data?.username

        if (username === 'admin') {
          localStorage.setItem('ROLE', 'ADMIN')
          message.info('Đăng nhập thành công')
          navigate('/admin/users')
        } else {
          localStorage.setItem('ROLE', 'USER')
          navigate('/')
        }

        //
        // message.info('Đăng nhập thành công')
        // navigate('/admin/users')
      })
      .catch((error) => {
        message.error('Username hoặc mật khẩu không đúng')
      })
  }

  return (
    <>
      <div className="login-container" id="loginid">
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-title">Sign in to Sho:ez</div>
            <input
              className="login-input-bar"
              type="text"
              placeholder="Username"
              {...register('username', {
                required: 'Username không được để trống'
              })}
            ></input>
            <ErrorMessage errors={errors} name="username" />
            <input
              className="login-input-bar"
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Mật khẩu không được để trống'
              })}
            ></input>
            <ErrorMessage errors={errors} name="password" />
            <button className="login-button">Login</button>
            <div className="login-form-line"></div>
            <div className="flex items-center pb-2 login-form-bottom-text">
              Don't have a Sho:ez account?{' '}
              <Link
                to="/signup"
                onClick={() => {
                  // window.scrollTo(0, 0);
                  // showLogin();
                }}
              >
                <span>Create yours now.</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
