import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

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
    <div className="mx-4 mt-2">
      <nav className="navbar_container text-center">

        <div className="navbar_header">
          <div className="anchor_logo_container">
            <Link to="/" onClick={closeNavbar}>
              <img className="anchor_logo" src="/anchor.png" alt="Anchor" />
            </Link>
          </div>

          <button
            className="navbar-toggler navbar_dropdown"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div className="navbar_img_container">
              <img className="navbar_img" src="/interface.png" alt="menu" />
            </div>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar_bg">
            <ul className="navbar-nav mb-2 mb-lg-0">

              {!user ? (
                ""
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav_link"
                    to="/appointments"
                    onClick={closeNavbar}
                  >
                    Appointments
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
                    Goals
                  </Link>
                </li>
              )}

              {!user ? (
                ""
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav_link"
                    to="/tasks"
                    onClick={closeNavbar}
                  >
                    Tasks
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link
                  className="nav_link"
                  to="/how_to_use"
                  onClick={closeNavbar}
                >
                  How To Use
                </Link>
              </li>

              {!user ? (
                <li className="nav-item">
                  <Link
                    className="nav_link"
                    to="/login"
                    onClick={closeNavbar}
                  >
                    Login
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav_link"
                    to="/logout"
                    onClick={closeNavbar}
                  >
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