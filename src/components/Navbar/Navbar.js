import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import "./Navbar.css";

function Navbar() {
  const { user } = useUser();

  const closeNavbar = () => {
    const navbar = document.getElementById("navbarSupportedContent");
    const bsCollapse = window.bootstrap?.Collapse.getInstance(navbar);

    if (bsCollapse) {
      bsCollapse.hide();
    }
  };

  return (
    <div className="navbar_container mx-4 mt-2 text-end">
      <nav className="navbar_container">
        <button
          className="navbar_button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img
            className="navbar-toggler navbar_img"
            src="/interface.png"
            alt="menu"
          />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="white_bg">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav_link" to="/" onClick={closeNavbar}>
                  Home
                </Link>
              </li>
              {!user ? (
                ""
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav_link"
                    to="/tasks/add"
                    onClick={closeNavbar}
                  >
                    Add Task
                  </Link>
                </li>
              )}

              {!user ? (
                ""
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav_link"
                    to="/goals/add"
                    onClick={closeNavbar}
                  >
                    Add Goal
                  </Link>
                </li>
              )}

              {!user ? (
                ""
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav_link"
                    to="/goals"
                    onClick={closeNavbar}
                  >
                    View Goals
                  </Link>
                </li>
              )}

              {!user ? (
                <li className="nav-item">
                  <Link className="nav_link" to="/login" onClick={closeNavbar}>
                    Login
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav_link" to="/logout" onClick={closeNavbar}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
