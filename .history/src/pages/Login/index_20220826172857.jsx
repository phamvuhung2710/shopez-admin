import "./style.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('data: ', data)
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
            {...register("username")}
          ></input>
          <input
            className="login-input-bar"
            type="password"
            placeholder="Password"
            {...register("password")}
          ></input>
          <button className="login-button">
            Login
          </button>
          <div className="login-form-line"></div>
          <div className="login-form-bottom-text flex items-center">
            Don't have a Sho:ez account?{" "}
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
  );
}

export default Login;
