import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import ErrorMessage from '../../components/ErrorMessage'
import axios from 'axios'
import { originalURL } from '../../constants'

function Login() {
  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem('authenticated')

  useEffect(() => {
    if (isAuthenticated === 'true') {
      navigate('/admin/users')
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
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
            <div className="login-form-bottom-text flex items-center">
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
