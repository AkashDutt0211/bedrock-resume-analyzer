import express from "express";
import resumeRoutes from "./src/routes/resumeRoutes.js";

const app = express();

app.use("/resume", resumeRoutes);

app.listen(3000, () => {
 console.log("Server running on port 3000");
});