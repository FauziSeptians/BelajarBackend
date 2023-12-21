const KaryawanModel = require("../Model/KaryawanModel");
const asyncHandler = require("express-async-handler");
const Joi = require("joi");

exports.CreateKaryawanData = async (req, res, next) => {
   const { error } = validateKaryawan(req.body); // Validasi data input
   const newKaryawan = new KaryawanModel(req.body); // Membuat instance baru dari model Karyawan

   if (error) {
      return res.status(400).json({
         status: 400,
         message: error.details[0].message,
         additionalData: {},
      });
   }

   try {
      const exist = await KaryawanModel.findOne({ Nama: newKaryawan.Nama },"_id");
      if (exist) {
         res.status(400).json({
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
      res.status(500).json({
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
   });

   return schema.validate(karyawan);
}
