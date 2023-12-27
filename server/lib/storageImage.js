const multer = require("multer");
const path = require("path");
const getDateNow = require("./getDateNow");
const fs = require("fs");

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      console.log(req.body.name);
      let namaKaryawan = req.body.Nama;

      if (fs.existsSync(`assets/Karyawan/${namaKaryawan}`)) {
         cb(null, `assets/Karyawan/${namaKaryawan}`);
      } else {
         console.log(namaKaryawan.includes(" "));
         namaKaryawan = namaKaryawan.includes(" ") ? namaKaryawan.replaceAll(" ", "-") : "";

         let folderPath = `assets/Karyawan/${namaKaryawan}`;
         fs.mkdirSync(folderPath, { recursive: true });
         cb(null, `assets/Karyawan/${namaKaryawan}`);
      }
      // Menentukan folder penyimpanan (dalam contoh ini: 'uploads/')
   },
   filename: (req, file, cb) => {
      console.log("file");
      console.log(file);
      let namaKaryawan = req.body.Nama;
      // Menentukan nama file yang diunggah (terserah Anda)

      let date = new Date();
      const uniqueSuffix = `${date.getDate()}${
         date.getMonth() + 1
      }${date.getFullYear()}`;
      const ext = path.extname(file.originalname);

      cb(null, `${namaKaryawan}-${uniqueSuffix}${ext}`); // Menggabungkan nama file dengan ekstensi asli
   },
});

module.exports = storage;
