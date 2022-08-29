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
        <form onSubmit={handleSubmit(onSubmit)}>

        </form>
          
        </div>
      </div>
    </>
  )
}

export default Signup
