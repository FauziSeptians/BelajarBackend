const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const KaryawanSchema = new Schema({
    Nama: {
        type : String,
    },
    Notelp : {
        type : String,
        min : 10,
        max : 12
    },
    Umur : {
        type : Number,
        min : 0,
        max : 100,
    },
    TanggalKeanggotaan : {
        type : Date,
    },
    Password : {
        type : String,
    }
});

const KaryawanModel = new mongoose.model('Karyawan' , KaryawanSchema);

module.exports = KaryawanModel;