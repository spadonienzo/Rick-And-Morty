import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { validation, isButtonDisabled } from "./validations";
import { getUsers } from "../../redux/actions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const userExists = users.find((user) => user.email === userData.email);

    if (userExists) {
      if (userExists.password === userData.password) {
        dispatch(login(userData));
        navigate("/home");
      } else {
        alert("Wrong password");
      }
    } else {
      alert("No users registered with this email, try again or Sign up");
    }
  };

  return (
    <div className={style.container}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className={style.p}>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            onChange={(event) => {
              handleChange("email", event.target.value);
            }}
            isInvalid={errors.email}
            isValid={userData.email && !errors.email}
          />
          <Form.Control.Feedback type="invalid">
            <div>Check the e-mail format</div>
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label className={style.p}>Password</Form.Label>
          <Form.Control
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
