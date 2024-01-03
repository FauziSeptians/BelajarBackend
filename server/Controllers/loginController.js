const KaryawanModel = require("../Model/KaryawanModel");
const jwt = require("jsonwebtoken");
const TokenModel = require("../Model/TokenJWT");

exports.LoginControllers = async (req, res) => {
   console.log(req.body);
   const { Nama, Password } = req.body;

   try {
      const secretKey = "Jdxkk36nOX";
      let DataID = await KaryawanModel.findOne({
         Nama: Nama,
      });

      console.log(DataID);
      if (DataID == null) {
         console.log("test");
         throw new Error("Akun anda tidak terdaftar");
      } else if (DataID) {
         if (DataID.Role != "Karyawan") {
            throw new Error("Tolong Login di section yang benar");
         } else {
            if (DataID.Password != Password) {
               console.log("hhallo");
               throw new Error("Passwords do not match");
            }

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
         }
      }
   } catch (error) {
      res.send({
         status: 500,
         message: error.message,
         additionalData: {},
      });
   }
};

exports.LoginAdminControllers = async (req, res) => {
   console.log(req.body);
   console.log("admin");
   const { Nama, Password, Role } = req.body;

   try {
      const secretKey = "Jdxkk36nOX";
      let DataID = await KaryawanModel.findOne({
         Nama: Nama,
      });
      console.log("hallose");
      console.log(DataID);

      console.log(DataID);
      if (DataID == null) {
         throw new Error("Akun anda tidak terdaftar");
      } else if (DataID) {
         if (DataID.Role != "Admin") {
  
            throw new Error("Tolong Login di section yang benar");
         } else {
            if (DataID.Password != Password) {
               console.log("hhallo");
               throw new Error("Passwords do not match");
            }

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
         }
      }
   } catch (error) {
      console.log(error);
      res.send({
         status: 500,
         message: error.message,
         additionalData: {},
      });
   }
};
