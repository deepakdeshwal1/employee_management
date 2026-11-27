import mongoose from "mongoose";

var EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    salary: { type: Number, required: true, default: 0 },
    joiningDate: { type: Date, required: true },
  },
  { timestamps: true },
);

const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;
