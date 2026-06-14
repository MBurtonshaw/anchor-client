import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function Login() {
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const navigate = useNavigate();

  const { login, loading } = useUser();

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
  

  if (loading) {
    return (
      <div className="component_container text-center m-auto m-5">
        <div className="card text-center">
          <h1 className="card-title p-5">Loading...</h1>
          <h4>Please wait</h4>
          <p className='p-5'>May need a moment to wake up</p>
        </div>
      </div>
    );
  }

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
        <div className="login_button_div p-3 pb-4 pt-1">
          <button className="primary_button m-4" onClick={handleSubmit}>
            Login
          </button>
        </div>
        <div className="login_subcontainer p-3">
          <p className="mb-2">New here?</p>
          <Link to="/register">
            <button className="secondary_button m-2">Register</button>
          </Link>
        </div>
        <div className="login_subcontainer p-3">
          <p className="text-muted mb-2">Need help getting started?</p>
          <Link to="/how_to_use">
            <button className="tertiary_button">How to Use</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
