//helper file to prepare responses.
// const apiResponse = require("../helpers/apiResponse");
// const { constants } = require("../helpers/constants");
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "#models/User.js";
// import authMiddleware from "../middleware/auth.js";
import responseHelper from "#utils/responseHelper.js";
import authRequest from "#requests/Auth/AuthRequest.js";

/**
 * User registration.
 *
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
export const register = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		const errors = authRequest.validateRegister(req.body);
		if (Object.keys(errors).length > 0) {
			return responseHelper.errorResponse(res, "Validation failed", errors);
		}
		let user = await User.findOne({ email });
		if (user) return responseHelper.errorResponse(res, "User already exists", errors);
	
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
	
		user = new User({ firstName, lastName, email, password: hashedPassword });
		await user.save();
	
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
	
		return responseHelper.successResponse(res, "Registration Successful", { token, user: { id: user._id, firstName, lastName, email } });
	  } catch (err) {
		console.error(err);
		return responseHelper.serverErrorResponse(res, "Something went wrong", {});
	  }
}

/**
 * User login.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const errors = authRequest.validateLogin(req.body);
		if (Object.keys(errors).length > 0) {
			return responseHelper.errorResponse(res, "Validation failed", errors);
		}
		const user = await User.findOne({ email });
		if (!user) return responseHelper.errorResponse(res, "Invalid credentials", errors);
		
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return responseHelper.errorResponse(res, "Invalid credentials", errors);
	
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
		return responseHelper.successResponse(res, "Login Successfull", { token, user: { id: user._id, name: `${user.firstName} ${user.lastName}`, email } });
	} catch (err) {
		console.error(err);
		return responseHelper.serverErrorResponse(res, "Something went wrong", {});
	}
}

export const me = async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).select("-password");
		return responseHelper.successResponse(res, "User details fetched successfully", user);
	} catch (err) {
		console.error(err);
		return responseHelper.serverErrorResponse(res, "Something went wrong", {});
	}
}