import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import style from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { validation, isButtonDisabled } from "./validations";
import { getUsers } from "../../redux/actions";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  console.log(users);

  const [userData, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(validation(userData));

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

  const handleSignup = async (event) => {
    event.preventDefault();
    const emailExists = users.some((user) => user.email === userData.email);
    if (emailExists) {
      alert("This E-mail is already registered, try to Log in");
    } else {
      dispatch(signup(userData));
      navigate("/home");
    }
  };

  return (
    <div className={style.container}>
      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label className={style.p}>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your name"
            onChange={(event) => {
              handleChange("name", event.target.value);
            }}
            isInvalid={errors.name}
            isValid={userData.name && !errors.name}
          />
          <Form.Control.Feedback type="invalid">
            <div>
              The name at least must have two letters and it can not include
              numbers
            </div>
          </Form.Control.Feedback>
        </Form.Group>

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
            Sign Up
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
