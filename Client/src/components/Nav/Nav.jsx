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
    <Navbar fixed="top" bg="white" variant="light" className={style.nav}>
      <Container>
        <Navbar.Brand href="/home">
          <Image className={style.logo} src={logoNav} />
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
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
        </Navbar.Collapse>
        <NavDropdown className={style.font} title={user?.name}>
          <NavDropdown.Item className={style.font} onClick={handleLogOut}>
            Log Out
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
};

export default Nav;
