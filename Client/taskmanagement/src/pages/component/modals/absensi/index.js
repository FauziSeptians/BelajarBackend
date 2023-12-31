import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Snackbar from "../../snackbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import HitungUmur from "../../../../../lib/menghitungUmur";
import { useRouter } from "next/router";
import { FormatCurrency } from "../../../../../lib/formatCurrency";

export default function Absensi({
   statusModal,
   Nama,
   formType,
   message,
   serverData,
}) {
   console.log(serverData);
   const [Message, setMessage] = useState("");
   const [Password, setPassword] = useState("");
   const [ImageData, setImageData] = useState(null);
   const [Description, setDescription] = useState(null);
   const [TanggalLahirPendaftar, setTanggalLahirPendaftar] = useState(null);
   const [NamaPendaftar, setNamaPendaftar] = useState(null);
   const [NotlpPendaftar, setNotlpPendaftar] = useState(null);
   const [dataPembukuan, setDataPembukuan] = useState({}); //
   const routes = useRouter(null);
   console.log(formType);

   console.log(Cookies.get("access_token"));

   useEffect(() => {
      const getDataPembukuan = async () => {
         console.log("hallo");
         const response = await axios
            .post("/api/summarypembukuan")
            .catch((error) => {
               console.log(error);
            });

         const { DataPengeluaran, DataPendapatan, DataHasil } =
            response.data.additionalData;

         setDataPembukuan({
            DataPengeluaran: DataPengeluaran,
            DataPendapatan: DataPendapatan,
            DataHasil: DataHasil,
         });

         console.log(response.data);
      };

      getDataPembukuan();
   }, []);

   console.log(dataPembukuan);

   async function SubmitAbsensi() {
      if (formType == "Masuk") {
         console.log(ImageData);
         const formdata = new FormData();
         formdata.append("Nama", Nama);
         formdata.append("Password", Password);
         formdata.append("imageData", ImageData);

         const response = await axios.post(
            "http://localhost:5000/AbsenMasuk",
            formdata,
            {
               headers: {
                  Authorization: `Bearer ${Cookies.get("access_token")}`,
                  "Content-Type": "multipart/form-data",
               },
            }
         );

         if (response.data.status == 200) {
            message(response.data.message);
            statusModal();
         } else {
            message(response.data.message);
         }
         console.log(response.data);
      } else if (formType == "Pulang") {
         console.log(Nama);
         const response = await axios.post("/api/UpdatePulang", {
            Nama: Nama,
            Password: Password,
            Keterangan: Description,
         });

         if (response.data.status == 200) {
            message(response.data.message);
            statusModal();
         } else {
            message(response.data.message);
         }
      } else if (formType == "BuatDataKaryawan") {
         let datenow = new Date();

         console.log(TanggalLahirPendaftar);
         let tanggalLahir = new Date(
            Date.UTC(
               TanggalLahirPendaftar["$y"],
               TanggalLahirPendaftar["$M"],
               TanggalLahirPendaftar["$D"]
            )
         );
         console.log(tanggalLahir);
         console.log(datenow);
         let Umur = HitungUmur(
            TanggalLahirPendaftar["$y"],
            TanggalLahirPendaftar["$M"] + 1,
            TanggalLahirPendaftar["$D"]
         );
         console.log(Umur);
         const response = await axios.post("/api/createdata", {
            Nama: NamaPendaftar,
            Password: Password,
            Notelp: NotlpPendaftar,
            Role: "Karyawan",
            Umur: Umur,
            TanggalKeanggotaan: datenow,
         });
         if (response.data.status == 200) {
            message(response.data.message);
            statusModal();
         } else {
            message(response.data.message);
         }
      } else if (formType == "Pulang") {
         statusModal();
      }
   }
   const [urlIMG, setUrlIMG] = useState(null);

   useEffect(() => {
      if (ImageData) {
         setUrlIMG(URL.createObjectURL(ImageData));
         console.log(urlIMG);
      }
   }, [ImageData]);

   function Logout() {
      Cookies.remove("access_token", {
         path: "/",
         secure: true, // Opsional: Hanya jika cookie menggunakan HTTPS
         httpOnly: true, // Opsional: Hanya jika cookie ditandai sebagai HttpOnly
      });
      setTimeout(() => {
         routes.push({
            pathname: "/",
         });
      }, [1000]);
      statusModal();
   }

   console.log(NotlpPendaftar);
   console.log(NotlpPendaftar && NotlpPendaftar.length);

   console.log(urlIMG);
   return (
      <>
         <div className="absolute z-[10000] m-0 p-0 bg-[#b2b2b251] w-full h-full flex justify-center items-center cursor-pointer">
            <div className="card p-7 rounded-lg bg-white flex flex-col gap-4 w-[30%] text-[16px] text-[#00000098]">
               {formType == "BuatDataKaryawan" ? (
                  <div className=" pb-3 border-b-1">
                     <div className="Header text-[20px] font-semibold tracking-wide">
                        Form karyawan baru
                     </div>
                     <div className="subheader text-[14px] text-[#0000007b]">
                        Formulir untuk pembuatan data karyawan baru yang masuk
                        di perusahaan anda
                     </div>
                  </div>
               ) : formType == "Logout" ? (
                  <div className="text-[24px] font-semibold text-black mb-3">
                     LOGOUT
                  </div>
               ) : formType == "Pembukuan" ? (
                  <div className="flex justify-between">
                     <div className="text-[24px] font-semibold text-black mb-3">
                        Pembukuan
                     </div>
                     <div
                        onClick={() => statusModal()}
                        className="cursor-pointer"
                     >
                        X
                     </div>
                  </div>
               ) : (
                  <div className="text-[24px] font-semibold text-black mb-3">
                     FORM ABSENSI
                  </div>
               )}
               {formType == "Masuk" ? (
                  <div className=" w-full h-[250px] flex items-center justify-center">
                     {urlIMG ? (
                        <img
                           src={urlIMG}
                           className="h-full w-[250px] rounded-full flex items-center justify-center relative shadow-lg border-[#b4fe3a] border-[1px]"
                           onClick={() => setUrlIMG(null)}
                        ></img>
                     ) : (
                        <div className="bg-[#b2b2b251] h-full w-[250px] rounded-full flex items-center justify-center relative cursor-pointer">
                           <input
                              type="file"
                              className="w-full h-full opacity-5 absolute inset-0 cursor-pointer"
                              onChange={(e) => setImageData(e.target.files[0])}
                              accept=".jpg, .jpeg, .png"
                           ></input>
                        </div>
                     )}
                  </div>
               ) : formType == "Pulang" ? (
                  <div className=" w-full h-[250px] flex items-center justify-center">
                     <textarea
                        className="w-full h-full p-3 outline-none border border-[4px solid to-black] rounded-md"
                        placeholder="Deskripsikan pekerjaanmu hari ini"
                        onChange={(e) => setDescription(e.target.value)}
                     ></textarea>
                  </div>
               ) : formType == "BuatDataKaryawan" ? (
                  <>
                     <div className="mt-5 flex flex-col gap-5">
                        <div className="grid grid-cols-2 gap-4 items-center">
                           <Input
                              type="text"
                              label="Nama"
                              className="w-full h-[48px] rounded-none"
                              onChange={(e) => setNamaPendaftar(e.target.value)}
                           />
                           <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                 label="Tanggal Lahir"
                                 onChange={(e) => setTanggalLahirPendaftar(e)}
                                 style={{ zIndex: 150000000 }} // Ubah z-index di sini
                              />
                           </LocalizationProvider>
                        </div>
                        <Input
                           type="number"
                           label="No Telp"
                           className="w-full h-[48px] rounded-none"
                           value={NotlpPendaftar}
                           onChange={(e) => {
                              console.log(e.target.value.length12);
                              if (e.target.value.length <= 12) {
                                 setNotlpPendaftar(e.target.value);
                              }
                           }}
                        />
                        {NotlpPendaftar && NotlpPendaftar.length < 10 && (
                           <div className="text-[12px] text-[red] tracking-[0.4px] font-medium">
                              Nomer tlp kurang dari 10 digit
                           </div>
                        )}
                        <Input
                           type="password"
                           label="Password"
                           className="w-full h-[48px] rounded-none"
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </div>
                  </>
               ) : formType == "Logout" ? (
                  <div className="w-full flex flex-col items-center ">
                     <img
                        src="/assets/logout.png"
                        width={260}
                        className=""
                     ></img>
                     <div className="">
                        Apakah kamu yakin akan keluar dari aplikasi ?
                     </div>
                  </div>
               ) : formType == "Pembukuan" ? (
                  <>
                     <div className="flex flex-col gap-4">
                        <div className="flex justify-between py-4 border-b-1">
                           <div>Pendapatan</div>
                           <div className="text-[green]">
                              {FormatCurrency(dataPembukuan.DataPendapatan)}
                           </div>
                        </div>
                        <div className="flex justify-between py-4 border-b-1">
                           <div>Pengeluaran</div>
                           <div className="text-[red]">
                              {FormatCurrency(dataPembukuan.DataPengeluaran)}
                           </div>
                        </div>
                     </div>
                     <div className="flex justify-between items-center py-4">
                        <div className="font-semibold">Hasil</div>
                        <div
                           className={`border-b-1 py-2 ${
                              dataPembukuan.DataHasil < 0
                                 ? "text-[red]"
                                 : "text-[green]"
                           } font-medium`}
                        >
                           {FormatCurrency(dataPembukuan.DataHasil)}
                        </div>
                     </div>
                  </>
               ) : (
                  ""
               )}
               {!(formType == "BuatDataKaryawan") &&
                  !(formType == "Logout") &&
                  !(formType == "Pembukuan") && (
                     <div className="flex flex-col gap-2 mt-4">
                        <Input
                           type="password"
                           label="Password"
                           className="w-full h-[48px] rounded-none"
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </div>
                  )}
               <div className="flex gap-3 mt-4">
                  {!formType == "Pembukuan" ? (
                     <Button
                        className="w-full bg-[black] fs-bold tracking-[1px] text-white"
                        onClick={() => statusModal()}
                     >
                        Kembali
                     </Button>
                  ) : (
                     ""
                  )}
                  {formType == "BuatDataKaryawan" ? (
                     Nama &&
                     Password &&
                     NotlpPendaftar &&
                     NotlpPendaftar.length >= 10 &&
                     NotlpPendaftar.length <= 12 &&
                     TanggalLahirPendaftar ? (
                        <>
                           <Button
                              className="w-full bg-[black] fs-bold tracking-[1px] text-white"
                              onClick={() => statusModal()}
                           >
                              Kembali
                           </Button>
                           <Button
                              className="w-full bg-[#b4fe3a] fs-bold tracking-[1px]"
                              onClick={() => SubmitAbsensi()}
                           >
                              Submit
                           </Button>
                        </>
                     ) : (
                        <>
                           <Button
                              className="w-full bg-[black] fs-bold tracking-[1px] text-white"
                              onClick={() => statusModal()}
                           >
                              Kembali
                           </Button>
                           <Button
                              className="w-full bg-[#bcbcbc] fs-bold tracking-[1px]"
                              disabled
                              onClick={() => SubmitAbsensi()}
                           >
                              Submit
                           </Button>{" "}
                        </>
                     )
                  ) : formType == "Logout" ? (
                     <>
                        <Button
                           className="w-full bg-[black] fs-bold tracking-[1px] text-white"
                           onClick={() => statusModal()}
                        >
                           Kembali
                        </Button>
                        <Button
                           className="w-full bg-[red] text-white fs-bold tracking-[1px]"
                           onClick={() => Logout()}
                        >
                           Logout
                        </Button>
                     </>
                  ) : formType == "Pembukuan" ? (
                     ""
                  ) : formType == "Masuk" ? (
                     <>
                        <Button
                           className="w-full bg-[black] fs-bold tracking-[1px] text-white"
                           onClick={() => statusModal()}
                        >
                           Kembali
                        </Button>
                        <Button
                           className={`w-full ${
                              ImageData && Password
                                 ? "bg-[#b4fe3a] cursor-pointer"
                                 : "bg-[#bcbcbc]"
                           } fs-bold tracking-[1px]`}
                           disabled={ImageData && Password ? false : true}
                           onClick={() => SubmitAbsensi()}
                        >
                           Submit
                        </Button>
                     </>
                  ) : formType == "Pulang" ? (
                     <>
                        <Button
                           className="w-full bg-[black] fs-bold tracking-[1px] text-white"
                           onClick={() => statusModal()}
                        >
                           Kembali
                        </Button>
                        <Button
                           className={`w-full ${
                              Description && Password
                                 ? "bg-[#b4fe3a] cursor-pointer"
                                 : "bg-[#bcbcbc]"
                           } fs-bold tracking-[1px]`}
                           disabled={Description && Password ? false : true}
                           onClick={() => SubmitAbsensi()}
                        >
                           Submit
                        </Button>
                     </>
                  ) : (
                     ""
                  )}
               </div>
            </div>
         </div>
      </>
   );
}
