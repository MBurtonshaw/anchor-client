import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regPassTwo, setRegPassTwo] = useState("");

  const navigate = useNavigate();

  const { register, loading } = useUser();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (regPass !== regPassTwo) {
      alert("Hmm... it seems like the passwords don't match");
      return;
    }

    const success = await register({
      username: regUser,
      password: regPass,
      passwordTwo: regPassTwo,
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
        <div className="register_button_div w-50 m-auto p-3 pb-4 pt-1">
          <button className="primary_button m-4" onClick={handleSubmit}>
            Register
          </button>
        </div>
        <div className="register_subcontainer p-3">
          <p className="mb-2">Already have an account?</p>
          <Link to="/login">
            <button className="secondary_button m-2">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
