const express = require("express");
const app = express();
const KaryawanControllers = require("./Controllers/KaryawanControllers");
const TaskSchedullerController = require("./Controllers/TaskSchedullerController");
const connectDB = require("./db");
const authenticateToken = require("./Controllers/authController");
const LoginControllers = require("./Controllers/loginController");

const port = 5000;

app.use(express.json());

connectDB();

app.listen(port, () => {
   console.log(`'listen to port ${port}'`);
});
app.get("/", function (req, res) {
   res.status(200).send({ message: "Status Success" });
});
app.post("/login", LoginControllers.LoginControllers);
app.use(authenticateToken);
app.post("/CreateDataKaryawan", KaryawanControllers.CreateKaryawanData);
app.post("/PendataanTask", TaskSchedullerController.AbsenMasuk);
app.post("/UpdatePulang", TaskSchedullerController.UpdatePulang);
