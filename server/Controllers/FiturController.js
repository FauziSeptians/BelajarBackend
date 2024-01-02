exports.FiturSidebar = async (req, res) => {
   console.log(req.body);
   const fiturAdmin = [
      {
         NamaFitur: "Buat Data Karyawan",
         RoutePath: "/admin",
         Description: "Membuat data karyawan baru di perusahaanmu",
      },
      {
         NamaFitur: "Data Karyawan",
         RoutePath: "/adminpage/datakaryawan",
         Description: "Data data karyawan yang ada di perusahaanmu",
      },
      {
         NamaFitur: "Data Pekerjaan Karyawan",
         RoutePath: "/adminpage/taskmanagementKaryawan",
         Description: "Melihat progres pekerjaan dari karyawanmu",
      },
      {
         NamaFitur: "Pembukaan Pendapatan dan Pengeluaran",
         RoutePath: "/adminpage/pembukuan",
         Description: "Melihat progres pekerjaan dari karyawanmu",
      },
   ];

   const fiturKaryawan = [
      {
         NamaFitur: "Absensi",
         RoutePath: "/pekerja",
         Description: "Data Kehadiranmu dari kamu masuk kerja dan pulang kerja",
      },
      {
         NamaFitur: "Manajement Tugas",
         RoutePath: "/taskmanagement",
         Description: "Data tugas yang sudah kamu lakukan hari ini",
      },
   ];

   try {
      const { Role } = req.body;

      if (Role == "Admin") {
         res.status(200).send({
            status: 200,
            message: "Fitur Berhasil diambil",
            additionalData: fiturAdmin,
         });
      } else if (Role == "Karyawan") {
         res.status(200).send({
            status: 200,
            message: "Fitur Berhasil diambil",
            additionalData: fiturKaryawan,
         });
      } else {
         res.status(200).send({
            status: 404,
            message: "Role tidak terdaftar",
            additionalData: {},
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
