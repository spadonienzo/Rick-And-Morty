import React, { useState, useEffect } from "react";
import style from "./Create.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import validation from "./validation";

const Create = () => {
  const [errors, setErrors] = useState({});
  const [productData, setData] = useState({
    name: "",
    image: null,
    description: "",
    country: "",
    category: "",
    price: "",
    stock: "",
    amountMl: "",
    alcoholContent: "",
  });

  const handleChange = (field, value) => {
    setData({
      ...productData,
      [field]: value,
    });

    setErrors(
      validation({
        ...productData,
        [field]: value,
      })
    );
  };

  console.log(productData);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={style.container}>
      <h3 className={style.title}>Nuevo Producto</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => {
              handleChange("name", event.target.value);
            }}
            // isInvalid={errors.name}
            // isValid={userInformation.name && !errors.name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => {
              handleChange("description", event.target.value);
            }}
            // isInvalid={errors.name}
            // isValid={userInformation.name && !errors.name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Pais de origen</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => {
              handleChange("country", event.target.value);
            }}
            // isInvalid={errors.name}
            // isValid={userInformation.name && !errors.name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Categoria</Form.Label> //Agregar DROPDOWN TRAER
          GETCATEGORIES
          <Form.Control
            type="text"
            onChange={(event) => {
              handleChange("category", event.target.value);
            }}
            // isInvalid={errors.name}
            // isValid={userInformation.name && !errors.name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => {
              handleChange("price", event.target.value);
            }}
            // isInvalid={errors.name}
            // isValid={userInformation.name && !errors.name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => {
              handleChange("stock", event.target.value);
            }}
            // isInvalid={errors.name}
            // isValid={userInformation.name && !errors.name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="amountMl">
          <Form.Label>Cantidad en Mililitros</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => {
              handleChange("amountMl", event.target.value);
            }}
            // isInvalid={errors.name}
            // isValid={userInformation.name && !errors.name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="alcoholContent">
          <Form.Label>Graduacion Alcoholica</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => {
              handleChange("alcoholContent", event.target.value);
            }}
            // isInvalid={errors.name}
            // isValid={userInformation.name && !errors.name}
          />
        </Form.Group>
        <Button className={style.button} variant="primary" type="submit">
          Crear
        </Button>
      </Form>
    </div>
  );
};

export default Create;
