import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regPassTwo, setRegPassTwo] = useState("");

  const navigate = useNavigate();

  const { register } = useUser();

  const handleChange = (e, element) => {
    element(e.target.value);
  };

  const handleName = (e) => {
    handleChange(e, setRegUser);
  };

  const handlePass = (e) => {
    handleChange(e, setRegPass);
  };

  const handlePassTwo = (e) => {
    handleChange(e, setRegPassTwo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (regPass !== regPassTwo) {
      alert("Hmm... it seems like the passwords don't match");
      return;
    }
    register({ username: regUser, password: regPass, passwordTwo: regPassTwo });
    navigate("/");
  };

  return (
    <div className="component_container text-center">
      <div className="card text-center m-auto">
        <h1 className="card-title mt-4">Register</h1>
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
        <div className="pb-3">
          <label htmlFor="passwordTwo">Re-Type Password:</label>
          <br />
          <input
            type="password"
            id="passwordTwo"
            name="pass_word_two"
            onChange={handlePassTwo}
          />
        </div>
        <div className="register_button_div w-50 m-auto p-3">
          <button className="primary_button m-4" onClick={handleSubmit}>
            Register
          </button>
        </div>
        <div className="register_subcontainer p-3">
          <h4 className="mt-3 mb-2">Already have an account?</h4>
          <Link to="/login"><button className='secondary_button'>Login</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
