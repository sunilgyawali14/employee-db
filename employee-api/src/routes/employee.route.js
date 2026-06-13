const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employee.controller");
const authMiddleware = require("../middleware/authMiddleware");
const { validateEmployee, handleValidationErrors } = require("../utils/validators");

// All routes require API Key
router.use(authMiddleware);

// Create new employee
router.post(
  "/",
  validateEmployee,
  handleValidationErrors,
  EmployeeController.createEmployee
);

// Get all employees
router.get("/", EmployeeController.getAllEmployees);

// Search employees
router.get("/search", EmployeeController.searchEmployees);

// Get single employee
router.get("/:id", EmployeeController.getEmployeeById);

// Update employee
router.put(
  "/:id",
  validateEmployee,
  handleValidationErrors,
  EmployeeController.updateEmployee
);

// Delete employee
router.delete("/:id", EmployeeController.deleteEmployee);

module.exports = router;