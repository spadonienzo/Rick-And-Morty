import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { validation, isButtonDisabled } from "./validations";
import Swal from "sweetalert2";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.id) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User logged succesfully!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/home");
      });
    }
  }, [user, navigate]);

  const [errors, setErrors] = useState({});
  const [userData, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field, value) => {
    setData({
      ...userData,
      [field]: value,
    });

    setErrors(
      validation({
        ...userData,
        [field]: value,
      })
    );
  };

  function handleLoginError() {
    Swal.fire({
      icon: "error",
      title: "Please check your credentials!",
    });
    setData({
      email: "",
      password: "",
    });
    setErrors({});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(userData, handleLoginError));
  };

  return (
    <div className={style.container}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className={style.p}>Email address</Form.Label>
          <Form.Control
            value={userData.email}
            type="email"
            placeholder="name@example.com"
            onChange={(event) => {
              handleChange("email", event.target.value);
            }}
            isInvalid={!!errors.email}
            isValid={userData.email && !errors.email}
          />
          <Form.Control.Feedback type="invalid">
            <div>Check the e-mail format</div>
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label className={style.p}>Password</Form.Label>
          <Form.Control
            value={userData.password}
            type="password"
            placeholder="Your password"
            onChange={(event) => {
              handleChange("password", event.target.value);
            }}
            isInvalid={errors.password}
            isValid={userData.password && !errors.password}
          />
          <Form.Control.Feedback type="invalid">
            The password must contain at least 6 digits, one capital letter and
            one special character
          </Form.Control.Feedback>
        </Form.Group>

        <div className={style.buttons}>
          <Link to="/">
            <Button className={style.button}>Back</Button>
          </Link>
          <Button
            type="submit"
            className={style.button}
            disabled={isButtonDisabled(errors, userData)}
          >
            Log In
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
