const { truncateSync } = require("fs");
const PembukuanModel = require("../Model/Pembukuan");

exports.PembukuanData = async (req, res) => {
   const { Deskripsi, Kategori, Jumlah, Harga, TotalHarga } = req.body;

   console.log(req.body);
   console.log(Deskripsi);
   console.log(Kategori);
   console.log(Jumlah);
   console.log(Harga);
   console.log(TotalHarga);

   try {
      const pembukuan = new PembukuanModel();

      pembukuan.Deskripsi = Deskripsi;
      pembukuan.Kategori = Kategori;
      pembukuan.Jumlah = Jumlah;
      pembukuan.Harga = Harga;
      pembukuan.TotalHarga = TotalHarga;
      await pembukuan.save();

      res.status(200).send({
         status: 200,
         message: "Berhasil di save",
         additionalData: {},
      });
   } catch (error) {
      res.status(200).send({
         status: 500,
         message: error.message,
         additionalData: {},
      });
   }
};

exports.GetDataPembukuan = async (req, res) => {
   const DataPembukuan = await PembukuanModel.find({});

   try {
      res.status(200).send({
         status: 200,
         message: "Pembukuan berhasil didapatkan",
         additionalData: DataPembukuan,
      });
   } catch (error) {
      res.status(200).send({
         status: 500,
         message: error.message,
         additionalData: {},
      });
   }
};

exports.SummaryPembukuan = async (req, res) => {
   try {
      const data = await PembukuanModel.aggregate([
         {
            $group: {
               _id: "$Kategori", // Mengelompokkan berdasarkan kategori
               totalAmount: { $sum: "$TotalHarga" }, // Menghitung total dari field TotalHarga
            },
         },
      ]);
      console.log(data);

      const PengeluaranAmount = data.filter((el) => {
         if (el._id == "Pengeluaran") {
            return el.totalAmount;
         }
      });

      const PendapatanAmount = data.filter((el) => {
         if (el._id == "Pendapatan") {
            return el.totalAmount;
         }
      });

      const Data = {
         DataPengeluaran: PengeluaranAmount[0].totalAmount, //
         DataPendapatan: PendapatanAmount[0].totalAmount, //
         DataHasil: PendapatanAmount[0].totalAmount - PengeluaranAmount[0].totalAmount,
      };

      console.log(Data);

      res.status(200).send({
         status: 200,
         message: "Data Berhasil diambil",
         additionalData: Data,
      });
   } catch (error) {
      res.status(200).send({
         status: 500,
         message: error.message,
         additionalData: {},
      });
   }
};
