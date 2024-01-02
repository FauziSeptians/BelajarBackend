const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PembukuanSchema = new Schema({
    Deskripsi : {
        type : String,
        required : true,
    },
    Kategori : {
        type : String,
        required : true,
    },
    Jumlah : {
        type : Number,
        required : true,
    },
    Harga : {
        type : Number,
        required : true,
    },
    TotalHarga : {
        type : Number,
        required : true,
    }
})


const Pembukuan = new mongoose.model("Pembukuan", PembukuanSchema);

module.exports = Pembukuan;

