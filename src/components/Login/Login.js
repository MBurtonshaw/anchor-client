import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import "./Login.css";

function Login() {

  const [ loginUser, setLoginUser ] = useState('');
  const [ loginPass, setLoginPass ] = useState('');

  const navigate = useNavigate();

  const { login } = useUser();

  const handleChange = (e, element) => {
      element(e.target.value);
  };

  const handleName = (e) => handleChange(e, setLoginUser);
  const handlePass = (e) => handleChange(e, setLoginPass);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username: loginUser, password: loginPass });
    navigate('/');
  };

  return (
    <div className="login_container text-center">
      <h1 className='text-center m-4'>Login</h1>
      <div className='p-3'>
        <label htmlFor="username">Username: </label>
        <br></br>
        <input type="text" id="username" name="user_name" onChange={handleName}></input>
      </div>
      <div className='pb-3'>
        <label htmlFor="password">Password: </label>
        <br></br>
        <input type="password" id="password" name="pass_word" onChange={handlePass}></input>
      </div>
      <button onClick={handleSubmit}>Login</button>
      <div className='login_subcontainer p-3'>
        <h4 className='mt-5 mb-2'>Don't have an account yet?</h4>
        <Link to='/register'>Register</Link>
      </div>
    </div>
  );
}

export default Login;