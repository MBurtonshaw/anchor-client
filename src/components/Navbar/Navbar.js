import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import "./Navbar.css";

function Navbar() {
    const { user } = useUser();

    return (
        <div className="navbar_container mx-5 p-5 text-end">
            {!user ? (
                <>
                    <Link to="/">Home</Link>{" "}
                    <Link to="/login">Login</Link>
                </>
            ) : (
                <>
                    <Link to="/">Home</Link>{" "}
                    <Link to="/logout">Logout</Link>
                </>
            )}
        </div>
    );
}

export default Navbar;