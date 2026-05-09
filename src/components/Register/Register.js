import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Register.css";

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
    <div className="register_container text-center">
      <h1 className="text-center m-4">Register</h1>
      <div className="p-3">
        <label htmlFor="username">Username: </label>
        <br></br>
        <input
          type="text"
          id="username"
          name="user_name"
          onChange={handleName}
        ></input>
      </div>
      <div className="pb-3">
        <label htmlFor="password">Password: </label>
        <br></br>
        <input
          type="password"
          id="password"
          name="pass_word"
          onChange={handlePass}
        ></input>
      </div>
      <div className="pb-3">
        <label htmlFor="passwordTwo">Re-Type Password: </label>
        <br></br>
        <input
          type="password"
          id="passwordTwo"
          name="pass_word_two"
          onChange={handlePassTwo}
        ></input>
      </div>

      <button className="register_button" onClick={handleSubmit}>
        Register
      </button>
      <br></br>
      <div className="login_subcontainer p-3">
        <h4 className="mt-5 mb-2">Already have an account?</h4>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Register;
