const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "Job school field is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Job degree field is required";
  }

  if (Validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Job fieldOfStudy field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From Date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
