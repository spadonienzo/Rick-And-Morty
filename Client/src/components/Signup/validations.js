const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
const wordRegex = /^[A-Za-z\s]+$/;

const validation = (input) => {
  let errors = {};

  if (input.name && (!wordRegex.test(input.name) || input.name.length < 2)) {
    errors.name = true;
  }

  if (input.email && !emailRegex.test(input.email)) {
    errors.email = true;
  }

  if (input.password && !passwordRegex.test(input.password)) {
    errors.password = true;
  }

  return errors;
};

function isButtonDisabled(errors, input) {
  return (
    Object.values(errors).some((value) => value === true) ||
    !input.name ||
    !input.email ||
    !input.password
  );
}

export { validation, isButtonDisabled };
