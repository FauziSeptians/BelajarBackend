const KaryawanModel = require("../Model/KaryawanModel");
const jwt = require("jsonwebtoken");
const TokenModel = require("../Model/TokenJWT");

exports.LoginControllers = async (req, res) => {
   console.log(req.body);
   const { Nama, Password } = req.body;

   try {
      let DataID = await KaryawanModel.findOne({
         Nama: Nama,
         Password: Password,
      });
      console.log(DataID);
      const secretKey = "Jdxkk36nOX";
      if (DataID) {
         const accessToken = jwt.sign({ username: Nama }, secretKey, {
            expiresIn: "1h",
         });
         res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: true, // Hanya dalam HTTPS
            sameSite: "strict", // SameSite agar hanya dikirim ke situs yang sama
         }).send({
            status: 200,
            message: "Success Login",
            additionalData: {
               Nama: Nama,
               accessToken: accessToken,
               Role: DataID.Role,
            },
         });
         const Token = new TokenModel();
         Token.AccessToken = accessToken;
         Token.save();
      } else {
         res.send({
            status: 404,
            message: "ID not found",
            additionalData: {},
         });
      }
   } catch (error) {
      res.send({
         status: 500,
         message: "ID not found",
         additionalData: {},
      });
   }
};
