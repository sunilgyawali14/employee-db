const { body, validationResult } = require("express-validator");

const validateEmployee = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phoneNumber")
    .matches(/^[0-9]{10,}$/)
    .withMessage("Valid phone number required"),
  body("dateOfBirth").isISO8601().withMessage("Valid date required"),
  body("salary")
    .isNumeric()
    .custom((value) => value > 0)
    .withMessage("Salary must be positive"),
  body("post").trim().notEmpty().withMessage("Post is required"),
  body("country").trim().notEmpty().withMessage("Country is required"),
  body("city").trim().notEmpty().withMessage("City is required"),
  body("dateOfHiring").isISO8601().withMessage("Valid date required"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

module.exports = {
  validateEmployee,
  handleValidationErrors,
};