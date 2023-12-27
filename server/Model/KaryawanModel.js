const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KaryawanSchema = new Schema({
   Nama: {
      type: String,
      required: true,
      validate: {
         validator: function (value) {
            return /^[a-zA-Z ]*$/.test(value);
         },
         message: (props) =>
            `Nama "${props.value}" hanya boleh mengandung huruf!`,
      },
   },
   Notelp: {
      type: String,
      min: 10,
      max: 12,
   },
   Role: {
      type: String,
   },
   Umur: {
      type: Number,
      min: 0,
      max: 100,
   },
   TanggalKeanggotaan: {
      type: Date,
      validate: {
         validator: function (value) {
            return value <= new Date();
         },
         message: (props) => `Tanggal Masuk tidak bisa lebih dari sekarang`,
      },
   },
   Password: {
      type: String,
      minLength: 8,
   },
});

const KaryawanModel = new mongoose.model("Karyawan", KaryawanSchema);

module.exports = KaryawanModel;
