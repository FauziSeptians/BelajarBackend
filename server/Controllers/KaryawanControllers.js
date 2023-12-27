const KaryawanModel = require("../Model/KaryawanModel");
const Joi = require("joi");
const TokenModel = require("../Model/TokenJWT");

exports.CreateKaryawanData = async (req, res, next) => {
   const { error } = validateKaryawan(req.body); // Validasi data input
   const newKaryawan = new KaryawanModel(req.body); // Membuat instance baru dari model Karyawan

   if (error) {
      return res.status(200).json({
         status: 400,
         message: error.details[0].message,
         additionalData: {},
      });
   }

   try {
      const exist = await KaryawanModel.findOne(
         { Nama: newKaryawan.Nama },
         "_id"
      );
      if (exist) {
         res.status(200).json({
            status: 400,
            message: "Nama karyawan already exist",
            additionalData: {},
         });
      } else {
         await newKaryawan.save(); // Menyimpan data ke MongoDB
         res.status(200).json({
            status: 200,
            message: "Success Create Data",
            additionalData: newKaryawan,
         });
      }
   } catch (e) {
      console.log(e);
      res.status(200).json({
         status: 500,
         message: e.message,
         additionalData: {},
      });
   }
};

function validateKaryawan(karyawan) {
   const schema = Joi.object({
      Nama: Joi.string().required(),
      Notelp: Joi.string().min(10).max(12).required(),
      Umur: Joi.number().integer().min(1).max(100).required(),
      TanggalKeanggotaan: Joi.date().iso().required(),
      Password: Joi.string().required(),
      Role: Joi.string().required(),
   });

   return schema.validate(karyawan);
}

exports.validateLoginKaryawan = async (req, res) => {
   const { Nama, Token } = req.body;

   try {
      let DataId = await KaryawanModel.findOne({ Nama: Nama });

      let AccessToken = await TokenModel.findOne({ AccessToken: Token });

      if (DataId == null) {
         throw new Error("Data ID tidak ditemukan");
      } else if (AccessToken == null) {
         throw new Error("Token Tidak valid");
      } else if (DataId && AccessToken) {
         console.log(DataId);
         res.status(200).send({
            status: 200,
            message: "Credential valid",
            additionalData: {
               Nama: Nama,
               Role: DataId.Role,
            },
         });
      }
   } catch (error) {
      res.status(200).send({
         status: 500,
         message: error.message,
         additionalData: {},
      });
   }
};

exports.getAllKaryawan = async (req, res) => {
   try {
      const Alldata = await KaryawanModel.find({ Role: "Karyawan" });

      if (Alldata.length != 0) {
         res.status(200).send({
            status: 200,
            message: "Berhasil mengambil data",
            additionalData: Alldata,
         });
      } else {
         res.status(200).send({
            status: 404,
            message: "Data Tidak ada",
            additionalData: [],
         });
      }
   } catch (error) {
      res.status(200).send({
         status: 500,
         message: error.message,
         additionalData: [],
      });
   }
};
