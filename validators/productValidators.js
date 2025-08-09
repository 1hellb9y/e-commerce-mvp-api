const { body } = require("express-validator");

exports.productValidation = [
  body("title")
    .notEmpty().withMessage("Product title is required"),

  body("price")
    .isNumeric().withMessage("Price must be a number")
    .custom(value => value >= 0).withMessage("Price cannot be negative"),

  body("stock")
    .isInt({ min: 0 }).withMessage("Stock must be a non-negative integer")
];



exports.updateProductValidation = [
  body("title")
    .optional()
    .notEmpty().withMessage("Product title cannot be empty"),

  body("price")
    .optional()
    .isNumeric().withMessage("Price must be a number")
    .custom(value => value >= 0).withMessage("Price cannot be negative"),

  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("Stock must be a non-negative integer")
];