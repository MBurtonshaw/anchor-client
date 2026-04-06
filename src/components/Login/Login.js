import { Link } from 'react-router-dom';
import "./Login.css";

function Login() {
  return (
    <div className="login_container text-center">
      <h1 className='text-center m-4'>Login</h1>
      <div className='p-3'>
        <label for="username">Username: </label>
        <br></br>
        <input type="text" id="username" name="user_name"></input>
      </div>
      <div className='pb-3'>
        <label for="password">Password: </label>
        <br></br>
        <input type="text" id="password" name="pass_word"></input>
      </div>
      <Link to="/register">Register</Link>
      <br></br>
      <Link to="/logout">Logout</Link>
    </div>
  );
}

export default Login;