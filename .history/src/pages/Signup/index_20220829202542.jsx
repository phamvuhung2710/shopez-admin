import './style.css'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'


function Signup() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

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
          ></input>
          <div className="signup-form-desc">Password</div>
          <input
            className="signup-input-bar"
            type="password"
            placeholder="Password"
          ></input>
          <div className="signup-form-desc">Email</div>
          <input
            className="signup-input-bar"
            type="text"
            placeholder="Email"
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
