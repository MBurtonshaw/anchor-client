import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function Login() {
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const navigate = useNavigate();

  const { login } = useUser();

  const handleChange = (e, element) => {
    element(e.target.value);
  };

  const handleName = (e) => handleChange(e, setLoginUser);
  const handlePass = (e) => handleChange(e, setLoginPass);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login({
    username: loginUser,
    password: loginPass,
  });
    if (success) {
    navigate("/");
  }
  };

  return (
    <div className="component_container text-center">
      <div className="card text-center">
        <h1 className="card-title mt-4">Login</h1>
        <div className="p-3">
          <label htmlFor="username">Username: </label>
          <br />
          <input
            type="text"
            id="username"
            name="user_name"
            onChange={handleName}
          />
        </div>
        <div className="pb-3">
          <label htmlFor="password">Password: </label>
          <br />
          <input
            type="password"
            id="password"
            name="pass_word"
            onChange={handlePass}
          />
        </div>
        <div className="login_button_div p-3">
          <button className="primary_button m-4" onClick={handleSubmit}>
            Login
          </button>
        </div>
        <div className="login_subcontainer p-3">
          <h4 className="mt-3 mb-2">Don't have an account yet?</h4>
          <Link to="/register"><button className='secondary_button m-2'>Register</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
