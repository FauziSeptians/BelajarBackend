const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JadwalPekerjaSchema = new Schema({
   TanggalMasuk: {
      type: String,
   },
   JamMasuk: {
      type: String,
   },
   JamKeluar: {
      type: String,
   },
   Keterangan: {
      type: String,
   },
   Photo: {
      type: String,
   },
   IDPekerja: {
      type: Schema.Types.ObjectId,
      ref: "Karyawan",
   },
});

const JadwalPekerjaModel = new mongoose.model(
   "JadwalPekerja",
   JadwalPekerjaSchema
);

module.exports = JadwalPekerjaModel;
