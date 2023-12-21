const KaryawanModel = require("../Model/JadwalPekerjaModel");
const jwt = require("jsonwebtoken");

exports.LoginControllers = async (req, res) => {
    console.log(req.body);
   const { Nama, Password } = req.body;


   try {
      let DataID = KaryawanModel.findOne({ Nama: Nama, Password: Password });

      if (DataID) {
         const accessToken = jwt.sign({ username: Nama }, "secret_key");
         res.json({ accessToken });
      } else {
         res.status(404).json({
            status: 404,
            message: "ID not found",
            additionalData: {},
         });
      }
   } catch (error) {
      res.status(500).json({
         status:500,
         message: "ID not found",
         additionalData: {},
      });
   }
};
