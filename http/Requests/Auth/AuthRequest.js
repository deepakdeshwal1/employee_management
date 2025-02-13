import validator from "validator";

// Validate registration data
const validateRegister = (data) => {
    const errors = {};
    if (!data.firstName || !data.lastName || !data.email || !data.password) {
        errors.general = "All fields are required";
    }

    if (!validator.isEmail(data.email)) {
        errors.email = "Invalid email format";
    }

    if (!validator.isStrongPassword(data.password, { minLength: 6, minNumbers: 1 })) {
        errors.password = "Password must be at least 6 characters and contain at least one number.";
    }

    return errors;
};

// Validate login data
const validateLogin = (data) => {
    const errors = {};

    if (!data.email || !data.password) {
        errors.general = "Email and password are required";
    }

    if (!validator.isEmail(data.email)) {
        errors.email = "Invalid email format";
    }

    return errors;
};

export default {validateRegister, validateLogin};