const EmployeeModel = require("../models/employee.model");

class EmployeeController {
  static async createEmployee(req, res, next) {
    try {
      const employee = await EmployeeModel.createEmployee(req.body);

      res.status(201).json({
        success: true,
        message: "Employee created successfully",
        data: employee,
      });
    } catch (error) {
      if (error.code === "P2002") {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
      next(error);
    }
  }

  static async getAllEmployees(req, res, next) {
    try {
      const employees = await EmployeeModel.getAllEmployees();

      res.status(200).json({
        success: true,
        message: "Employees retrieved successfully",
        count: employees.length,
        data: employees,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getEmployeeById(req, res, next) {
    try {
      const { id } = req.params;

      const employee = await EmployeeModel.getEmployeeById(id);

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Employee retrieved successfully",
        data: employee,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateEmployee(req, res, next) {
    try {
      const { id } = req.params;

      const employee = await EmployeeModel.updateEmployee(id, req.body);

      res.status(200).json({
        success: true,
        message: "Employee updated successfully",
        data: employee,
      });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }
      next(error);
    }
  }

  static async deleteEmployee(req, res, next) {
    try {
      const { id } = req.params;

      await EmployeeModel.deleteEmployee(id);

      res.status(200).json({
        success: true,
        message: "Employee deleted successfully",
      });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }
      next(error);
    }
  }

  static async searchEmployees(req, res, next) {
    try {
      const { q } = req.query;

      if (!q || q.trim().length < 2) {
        return res.status(400).json({
          success: false,
          message: "Search query must be at least 2 characters",
        });
      }

      const employees = await EmployeeModel.searchEmployees(q.trim());

      res.status(200).json({
        success: true,
        message: "Search results retrieved successfully",
        count: employees.length,
        data: employees,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = EmployeeController;