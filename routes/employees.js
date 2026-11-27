import express from "express";
import {
  createEmployee,
  getEmployee,
  deleteEmployee,
  updateEmployee,
  updateEmployeePartial,
} from "../http/controllers/v1/Employees/EmployeeController.js";
import validate from "../http/middleware/validation.js";
import EmployeeRequest from "#requests/Employee/EmployeeRequest.js";

let router = express.Router();

router.post("/", validate(EmployeeRequest.EmployeeSchema), createEmployee);
router.get("/:id?", getEmployee);
router.put("/:id", validate(EmployeeRequest.EmployeeSchema), updateEmployee);
router.delete("/:id", deleteEmployee);
router.patch(
  "/:id",
  validate(EmployeeRequest.EmployeePartialSchema),
  updateEmployeePartial,
);

export default router;
