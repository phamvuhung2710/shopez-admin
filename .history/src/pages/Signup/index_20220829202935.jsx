import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { originalURL } from '../../constants'
import { message } from 'antd'
import ErrorMessage from '../../components/ErrorMessage'

function Signup() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    axios
      .post(`${originalURL}/register`, {
        username: data.username,
        password: data.password,
        email: data.email || '',
        name: data.name || '',
        role: 1
      })
      .then((res) => {
        const token = res?.data?.token
        const userId = res?.data?.id
        localStorage.setItem('TOKEN', token)

        const username = res?.data?.username

        if (username === 'admin') {
          localStorage.setItem('ROLE', 'ADMIN')
          message.info('Đăng kí thành công')
          navigate('/admin/users')
        } else {
          localStorage.setItem('ROLE', 'USER')
          localStorage.setItem('USERNAME', username)
          localStorage.setItem('USERID', userId)
          navigate('/')
        }
      })
      .catch((error) => {
        message.error('Username hoặc mật khẩu không đúng')
      })
  }

  return (
    <>
      <div className="signup-container">
        <div className="signup-form-container">
          <div className="signup-title">New Sho:ez Account</div>
          <div className="signup-form-desc">Username</div>
          <input
            className="signup-input-bar"
            type="text"
            placeholder="Username"
            {...register('username', {
              required: 'Username không được để trống'
            })}
          ></input>
          <ErrorMessage errors={errors} name="username" />
          <div className="signup-form-desc">Password</div>
          <input
            className="signup-input-bar"
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Mật khẩu không được để trống'
            })}
          ></input>
          <ErrorMessage errors={errors} name="password" />
          <div className="signup-form-desc">Email</div>
          <input
            className="signup-input-bar"
            type="text"
            placeholder="Email"
            {...register('email', {
              required: 'Email không được để trống'
            })}
          ></input>
          <div className="signup-form-desc">Phone number</div>
          <input
            className="signup-input-bar"
            type="text"
            placeholder="Phone Number"
          ></input>
          <a href="google.com" className="login-button">
            Submit
          </a>
          <div className="signup-form-line"></div>
          <div className="signup-form-bottom-text">
            Already have a Sho:ez account?{' '}
            <Link
              to="/signin"
              onClick={() => {
                // window.scrollTo(0, 0);
                // showLogin();
                document.body.style.overflow = 'hidden'
              }}
            >
              <span>Login.</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
