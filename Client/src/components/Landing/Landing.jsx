import style from "./Landing.module.css";
import Button from "react-bootstrap/Button";
import logo from "../../resources/logo.png";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={style.page}>
      <div>
        <img src={logo} alt="logo" className={style.img} />
      </div>
      <div className={style.container}>
        <Link to="/login">
          <Button className={style.button} variant="dark">
            LOGIN
          </Button>
        </Link>
        <p className={style.p}>OR</p>
        <Link to="/signup">
          <Button className={style.button} variant="dark">
            SIGNUP
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
