const { body } = require("express-validator");

exports.registerValidation = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

  body("email")
    .isEmail().withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

exports.loginValidation = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email"),

  body("password")
    .notEmpty().withMessage("Password is required")
];