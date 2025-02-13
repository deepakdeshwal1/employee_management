import express from 'express'; 
import authRouter from "./auth.js";

var app = express();

app.use("/auth/", authRouter);

export default app;