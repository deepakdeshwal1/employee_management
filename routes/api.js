import express from 'express'; 
import employeeRouter from "./employees.js";

var app = express();

app.use("/employees/", employeeRouter);

export default app;