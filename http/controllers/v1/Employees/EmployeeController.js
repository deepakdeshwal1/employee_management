import Employees from "#models/Employees.js";
import responseHelper from "#utils/responseHelper.js";

/**
 * Employee creation.
 *
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
export const createEmployee = async (req, res) => {
  try {
    const { name, email, department, salary, joiningDate } = req.body;

    const employee = new Employees({
      name,
      email,
      department,
      salary,
      joiningDate,
    });
    await employee.save();

    return responseHelper.successResponse(res, "Registration Successful", {
      user: { id: employee._id, name, email, department, salary, joiningDate },
    });
  } catch (err) {
    console.error(err);
    return responseHelper.serverErrorResponse(res, "Something went wrong", {});
  }
};

/**
 * Employee creation.
 *
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // If ID exists, fetch a single employee
    if (id) {
      const employee = await Employees.findById(id);

      if (!employee) {
        return responseHelper.errorResponse(res, "Employee not found", {});
      }

      return responseHelper.successResponse(
        res,
        "Employee fetched successfully",
        { user: employee },
      );
    }

    // If ID doesn't exist, fetch all employees
    const employees = await Employees.find();

    return responseHelper.successResponse(
      res,
      "Employees fetched successfully",
      { users: employees },
    );
  } catch (err) {
    console.error(err);

    return responseHelper.serverErrorResponse(res, "Something went wrong", {});
  }
};

/**
 * Employee update.
 *
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
export const updateEmployee = async (req, res) => {
  try {
    const { name, email, department, salary, joiningDate } = req.body;

    const employee = new Employees({
      name,
      email,
      department,
      salary,
      joiningDate,
    });
    await employee.save();

    return responseHelper.successResponse(res, "Registration Successful", {
      user: { id: employee._id, name, email, department, salary, joiningDate },
    });
  } catch (err) {
    console.error(err);
    return responseHelper.serverErrorResponse(res, "Something went wrong", {});
  }
};

/**
 * Employee partial update.
 *
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */

export const updateEmployeePartial = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employees.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!employee) {
      return responseHelper.errorResponse(res, "Employee not found", {});
    }

    return responseHelper.successResponse(
      res,
      "Employee updated successfully",
      { user: employee },
    );
  } catch (err) {
    console.error(err);

    return responseHelper.serverErrorResponse(res, "Something went wrong", {});
  }
};

/**
 * Employee deletion.
 *
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
export const deleteEmployee = async (req, res) => {
  try {
    // const { name, email, department, salary, joiningDate } = req.body;
    const { id } = req.params;

    const employee = await Employees.findByIdAndDelete(id);

    if (!employee) {
      return responseHelper.errorResponse(res, "Employee not found", {});
    }

    return responseHelper.successResponse(
      res,
      "Employee deleted successfully",
      { user: employee },
    );
  } catch (err) {
    console.error(err);
    return responseHelper.serverErrorResponse(res, "Something went wrong", {});
  }
};
