import { useState } from "react";
import style from "./Create.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { validation, isButtonDisabled } from "./validation";
import Select from "react-select";
import axios from "axios";
import { postCharacter } from "../../redux/actions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const Create = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [characterData, setData] = useState({
    name: "",
    image: "",
    origin: "",
    species: "",
    gender: "",
    status: "",
  });

  console.log(characterData);

  const genderOpt = ["Female", "Male", "unknown"];
  const statusOpt = ["Alive", "Dead", "unknown"];

  const genderOptions = genderOpt.map((gender) => ({
    value: gender,
    label: gender,
  }));

  const statusOptions = statusOpt.map((status) => ({
    value: status,
    label: status,
  }));

  const handleChange = (field, value) => {
    if (field === "gender" || field === "status") {
      setData({
        ...characterData,
        [field]: value.value,
      });
    } else {
      setData({
        ...characterData,
        [field]: value,
      });
    }

    setErrors(
      validation({
        ...characterData,
        [field]: value,
      })
    );
  };

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // Your Cloudinary upload preset

      // Make a POST request to Cloudinary to upload the image
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dtfviwqes/image/upload", // Cloudinary upload API URL
        formData
      );

      console.log(response);

      if (response.data.secure_url) {
        // Set the Cloudinary image URL in the productData state
        setData({
          ...characterData,
          image: response.data.secure_url,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!characterData.image) {
      characterData.image =
        "https://res.cloudinary.com/dtfviwqes/image/upload/v1699567752/oftludgmucdn98edwcdb.jpg";
    }
    Swal.fire({
      title: "Confirm new Character?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch the createProduct function
        dispatch(postCharacter(characterData))
          .then(() => {
            // Show a success alert if the product is created successfully
            Swal.fire(
              "Created!",
              "The character has been created succesfully.",
              "success"
            );
            setData({
              name: "",
              image: "",
              origin: "",
              species: "",
              gender: "",
              status: "",
            });
          })

          .catch((error) => {
            // Handle errors if the product creation fails
            Swal.fire(
              "Error!",
              "An error occurred while creating the character.",
              "error"
            );

            // You can log or handle the error as needed
            console.error(error);
          });
      }
    });
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>CREATE YOUR CHARACTER</h2>
      <form className={style.formcontainer} onSubmit={handleSubmit}>
        <div className={style.columnsContainer}>
          <div className={style.column}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => {
                  handleChange("name", event.target.value);
                }}
                isInvalid={errors.name}
                isValid={characterData.name && !errors.name}
                value={characterData.name}
              />
              <Form.Control.Feedback type="invalid">
                <div>
                  Name must have at least 2 letters and can't include numbers.
                </div>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleImageUpload(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="origin">
              <Form.Label>Origin</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => {
                  handleChange("origin", event.target.value);
                }}
                isInvalid={errors.origin}
                isValid={characterData.origin && !errors.origin}
                value={characterData.origin}
              />
              <Form.Control.Feedback type="invalid">
                <div>
                  Origin must have at least 2 letters and can't include numbers.
                </div>
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className={style.column}>
            <Form.Group className="mb-3" controlId="species">
              <Form.Label>Specie</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => {
                  handleChange("species", event.target.value);
                }}
                isInvalid={errors.species}
                isValid={characterData.species && !errors.species}
                value={characterData.species}
              />
              <Form.Control.Feedback type="invalid">
                <div>
                  Specie must have at least 2 letters and can't include numbers.
                </div>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Select
                options={genderOptions}
                value={genderOptions.find(
                  (gender) => gender.value === characterData.gender
                )}
                onChange={(selectedOption) =>
                  handleChange("gender", selectedOption)
                }
                name="gender"
                className={style.select}
              />
              <Form.Control.Feedback type="invalid">
                <div>Gender can't be null, please choose an option.</div>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Status</Form.Label>
              <Select
                options={statusOptions}
                value={statusOptions.find(
                  (status) => status.value === characterData.status
                )}
                onChange={(selectedOption) =>
                  handleChange("status", selectedOption)
                }
                name="status"
                className={style.select}
              />
              <Form.Control.Feedback type="invalid">
                <div>Status can't be null, please choose an option.</div>
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>
        <Button
          className={style.button}
          variant="primary"
          type="submit"
          disabled={isButtonDisabled(errors, characterData)}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default Create;
