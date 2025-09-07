import style from "./Nav.module.css";
import Container from "react-bootstrap/Container";
import Navs from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoNav from "../../resources/logoNav.png";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(window.localStorage.getItem("user"));

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar
      expand="md"
      fixed="top"
      bg="white"
      variant="light"
      className={style.nav}
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/home">
          <Image className={style.logo} src={logoNav} alt="App Logo" />
        </Navbar.Brand>

        {/* Toggle button for mobile */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Collapsible links */}
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Navs className="me-auto">
            <Navs.Link href="/home" className={style.font}>
              Home
            </Navs.Link>
            <Navs.Link href="/about" className={style.font}>
              About
            </Navs.Link>
            <Navs.Link href="/favorites" className={style.font}>
              Favorites
            </Navs.Link>
            <Navs.Link href="/create" className={style.font}>
              Create
            </Navs.Link>
          </Navs>

          {/* User dropdown */}
          <NavDropdown
            align="end"
            className={style.font}
            title={user?.name || "Account"}
          >
            <NavDropdown.Item className={style.font} onClick={handleLogOut}>
              Log Out
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Nav;
