const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();
const KaryawanControllers = require("./Controllers/KaryawanControllers");
const TaskSchedullerController = require("./Controllers/TaskSchedullerController");
const FiturController = require("./Controllers/FiturController");
const PembukuanControllers = require("./Controllers/PembukuanController");
const connectDB = require("./db");
const authenticateToken = require("./Controllers/authController");
const LoginControllers = require("./Controllers/loginController");
const storage = require("./lib/storageImage");
const getNameFolder = require("./lib/getNameFolder");
const port = 5000;

connectDB();
app.use(express.json());
app.use(cors());
const upload = multer({ storage });

app.listen(port, () => {
   console.log(`'listen to port ${port}'`);
});
app.post("/loginadmin", LoginControllers.LoginAdminControllers);
app.get("/", function (req, res) {
   res.status(200).send({ message: "Status Success" });
});
app.post("/login", LoginControllers.LoginControllers);

app.use(authenticateToken);
app.post("/CreateDataKaryawan", KaryawanControllers.CreateKaryawanData);
app.post(
   "/AbsenMasuk",
   upload.single("imageData"),
   TaskSchedullerController.AbsenMasuk
);
app.post("/UpdatePulang", TaskSchedullerController.UpdatePulang);
app.post("/getAllData", TaskSchedullerController.getAlltask);
app.post("/validateUser", KaryawanControllers.validateLoginKaryawan);
app.get("/getAllKaryawan", KaryawanControllers.getAllKaryawan);
app.get("/getAllTaskKaryawan", TaskSchedullerController.getAlltaskKaryawan);
app.post("/getsidebarfitur", FiturController.FiturSidebar);
app.post("/Pembukuan", PembukuanControllers.PembukuanData);
app.post("/getDatapembukuan", PembukuanControllers.GetDataPembukuan);
app.post("/summarypembukuan", PembukuanControllers.SummaryPembukuan);

app.get("/images/:ImageName", (req, res) => {
   const { ImageName } = req.params;

   console.log(getNameFolder(ImageName));

   const imagePath = path.join(
      __dirname,
      `assets/Karyawan/${getNameFolder(ImageName)}/`,
      ImageName
   ); // Ganti dengan path folder gambar Anda

   // Mengirimkan gambar sebagai respons
   res.sendFile(imagePath);
});
