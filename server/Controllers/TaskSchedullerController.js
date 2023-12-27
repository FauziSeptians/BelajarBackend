const JadwalPekerjaModel = require("../Model/JadwalPekerjaModel");
const KaryawanModel = require("../Model/KaryawanModel");
const getDateNow = require("../lib/getDateNow");

exports.AbsenMasuk = async (req, res) => {
   // masuk ke perusahaan dan absen
   console.log(req);
   console.log("test");
   console.log(req.body);
   console.log(req.file);

   const { Nama, Password } = req.body;
   // console.log(req.body);
   // console.log(Nama);

   try {
      let dataID = await KaryawanModel.findOne(
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
         res.status(200).json({
            status: 400,
            message: "Data already exists",
            additionalData: {},
         });
      } else {
         const jadwal = new JadwalPekerjaModel();
         let date = new Date();
         console.log(date);
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
            res.status(200).json({
               status: 404,
               message: "Not Found",
               additionalData: {},
            });
         }
      }
   } catch (e) {
      res.json({
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
      let dataID = await KaryawanModel.findOne(
         { Nama: Nama, Password: Password },
         "_id"
      );
      console.log(dataID);

      let exists = await JadwalPekerjaModel.findOne(
         { IDPekerja: dataID, TanggalMasuk: getDateNow(new Date()) },
         "_id"
      );
      console.log(exists);

      if (exists) {
         let datenow = new Date();
         let jamkeluar =
            datenow.getHours() +
            ":" +
            datenow.getMinutes() +
            ":" +
            datenow.getSeconds();

         if (datenow.getHours() < 17) {
            res.status(200).json({
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
         res.status(200).json({
            status: 404,
            message: "Kamu belum absen masuk",
            additionalData: {},
         });
      }
   } catch (e) {
      res.status(200).json({
         status: 500,
         message: e.message,
         additionalData: {},
      });
   }
};

exports.getAlltask = async function async(req, res) {
   console.log("awdwada");
   const { Nama } = req.body;
   console.log(req.body);
   try {
      const dataID = await KaryawanModel.findOne({ Nama: Nama });

      const data = await JadwalPekerjaModel.find({ IDPekerja: dataID });

      res.status(200).send(data);
   } catch (error) {
      console.log(error);
   }
};

exports.getAlltaskKaryawan = async function (req, res) {
   try {
      const data = await JadwalPekerjaModel.find().populate("IDPekerja","Nama");

      console.log(data);

      if (data) {
         res.status(200).send({
            status: 200,
            message: "Berhasil mengambil data",
            additionalData: data,
         });
      } else {
         res.status(200).send({
            status: 404,
            message: "Data tidak ditemukan",
            additionalData: {},
         });
      }
   } catch (error) {
      console.log(error);
   }
};
