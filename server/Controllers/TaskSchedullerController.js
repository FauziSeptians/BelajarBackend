const JadwalPekerjaModel = require("../Model/JadwalPekerjaModel");
const Karyawan = require("../Model/KaryawanModel");
const getDateNow = require("../lib/getDateNow");

exports.AbsenMasuk = async (req, res) => {
   // masuk ke perusahaan dan absen
   const { Nama, Password } = req.body;

   try {
      let dataID = await Karyawan.findOne(
         { Nama: Nama, Password: Password },
         "_id"
      );

      if (dataID == null) {
         throw new Error("dataId not found");
      }
      let existData = await JadwalPekerjaModel.findOne({
         IDPekerja: dataID,
         TanggalMasuk: getDateNow(new Date()),
      });

      if (existData) {
         res.status(400).json({
            status: 400,
            message: "Data already exists",
            additionalData: {},
         });
      } else {
         const jadwal = new JadwalPekerjaModel();
         let date = new Date();
         jadwal.TanggalMasuk = getDateNow(date);
         jadwal.JamMasuk =
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
         jadwal.IDPekerja = dataID;
         jadwal.Photo = `assets/Karyawan/${Nama}/${Nama}-${date.getDate()}${
            date.getMonth() + 1
         }${date.getFullYear()}`;
         jadwal.save();

         if (dataID) {
            res.status(200).json({
               status: 200,
               message: "Success Create Data",
               additionalData: jadwal,
            });
         } else {
            res.status(404).json({
               status: 404,
               message: "Not Found",
               additionalData: {},
            });
         }
      }
   } catch (e) {
      res.status(500).json({
         status: 500,
         message: e.message,
         additionalData: {},
      });
   }
};

exports.UpdatePulang = async (req, res) => {
   try {
      const { Nama, Password, Keterangan } = req.body;
      // dapetin id user sekarang yang mau absen pulang
      let dataID = await Karyawan.findOne(
         { Nama: Nama, Password: Password },
         "_id"
      );

      let exists = await JadwalPekerjaModel.findOne(
         { IDPekerja: dataID, TanggalMasuk: getDateNow(new Date()) },
         "_id"
      );

      if (exists) {
         let datenow = new Date();
         let jamkeluar =
            datenow.getHours() +
            ":" +
            datenow.getMinutes() +
            ":" +
            datenow.getSeconds();

         if (datenow.getHours() < 17) {
            res.status(404).json({
               status: 404,
               message: "Kamu belum saatnya pulang",
               additionalData: {},
            });
         } else {
            // cari yang sekarang dia mau update
            await JadwalPekerjaModel.findOneAndUpdate(
               { IDPekerja: dataID._id },
               { $set: { JamKeluar: jamkeluar, Keterangan: Keterangan } },
               { new: true }
            );
            res.status(200).json({
               status: 200,
               message: "Success Update Data",
            });
         }
      } else {
         res.status(404).json({
            status: 404,
            message: "Kamu belum absen masuk",
            additionalData: {},
         });
      }
   } catch (e) {
      res.status(500).json({
         status: 500,
         message: e.message,
         additionalData: {},
      });
   }
};

function captureImage() {
   return new Promise((resolve, reject) => {
      Webcam.capture("captured_image", (err, data) => {
         if (err) {
            reject(err);
         } else {
            const image = Buffer.from(data, "base64");
            resolve(image);
         }
      });
   });
}
