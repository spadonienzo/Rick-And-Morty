const wordRegex = /^[A-Za-z\u00C0-\u024F\s]+$/;

function validation(input) {
  let errors = {};

  if (input.name && (!wordRegex.test(input.name) || input.name.length < 2)) {
    errors.name = true;
  }

  if (
    input.origin &&
    (!wordRegex.test(input.origin) || input.origin.length < 2)
  ) {
    errors.origin = true;
  }

  if (
    input.species &&
    (!wordRegex.test(input.species) || input.species.length < 2)
  ) {
    errors.species = true;
  }

  return errors;
}

function isButtonDisabled(errors, input) {
  return (
    Object.values(errors).some((value) => value === true) ||
    !input.name ||
    !input.origin ||
    !input.species ||
    !input.gender ||
    !input.status
  );
}

export { validation, isButtonDisabled };
