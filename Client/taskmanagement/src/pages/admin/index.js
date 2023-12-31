import { Inter } from "next/font/google";
import Absensi from "../component/modals/absensi";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { User } from "@nextui-org/react";
import Typed from "react-typed";
import Greetings from "../component/greetings";

export default function Admin({ Data, Modals }) {
   const Username = Data.Nama;
   const routes = useRouter(null);

   function PushDataKaryawan() {
      routes.push({
         pathname: "/adminpage/datakaryawan",
         query: {
            id: Username,
         },
      });
   }

   function PushDataTaskKaryawan() {
      routes.push({
         pathname: "/adminpage/taskmanagementKaryawan",
         query: {
            id: Username,
         },
      });
   }

   function PushDataPembukuan() {
      routes.push({
         pathname: "/adminpage/pembukuan",
         query: {
            id: Username,
         },
      });
   }

   return (
      <>
         <section className=" w-full relative">
            <div className="content w-full h-screen">
               <Greetings
                  Username={Username}
                  Modals={(e) => Modals(e)}
               ></Greetings>
               <div className="mt-7 TaskManagement">
                  <div className="text-[20px] font-semibold tracking-[0.5px] pb-2 ">
                     Home Page
                  </div>

                  <div className="grid grid-cols-3 gap-7 mt-3">
                     <div
                        className="shadow-md p-5 min-h-[200px] rounded-xl flex justify-between items-center gap-6 cursor-pointer bg-[#ffffff72]"
                        onClick={() =>
                           Modals({
                              type: "BuatDataKaryawan",
                              Nama: Username,
                           })
                        }
                     >
                        <div>
                           <img
                              src="./assets/management.jpg"
                              width={80}
                              className="mb-3"
                           ></img>
                           <div className="text-[20px] font-semibold tracking-[1px]">
                              Buat Data Karyawan
                           </div>
                           <div className="text-[16px] text-[#000000ac]">
                              Formulir untuk pembuatan data karyawan baru yang
                              masuk di perusahaan anda
                           </div>
                        </div>
                        <div className="font-semibold">{">"}</div>
                     </div>
                     <div
                        className={`shadow-md p-5 min-h-[200px] rounded-xl flex justify-between items-center gap-6 cursor-pointer bg-[#ffffff72]`}
                        onClick={() => PushDataKaryawan()}
                     >
                        <div>
                           <img
                              src="./assets/kalender.jpg"
                              width={80}
                              className="mb-3"
                           ></img>
                           <div className="text-[20px] font-semibold tracking-[1px]">
                              Data Karyawan
                           </div>
                           <div className="text-[16px] text-[#000000ac]">
                              Data Karyawan perusahaanmu
                           </div>
                        </div>
                        <div className="font-semibold">{">"}</div>
                     </div>
                     <div
                        className="shadow-md p-5 min-h-[200px] rounded-xl flex items-center gap-6 cursor-pointer bg-[#ffffff72]"
                        onClick={() => PushDataTaskKaryawan()}
                     >
                        <div>
                           <img
                              src="./assets/karyawan.jpg"
                              width={100}
                              className="mb-3"
                           ></img>
                           <div className="text-[20px] font-semibold tracking-[1px]">
                              Data Pekerjaan Karyawan
                           </div>
                           <div className="text-[16px] text-[#000000ac]">
                             Data data list tugas yang sudah diselesaikan oleh karyawan
                           </div>
                        </div>
                        <div className="font-semibold">{">"}</div>
                     </div>
                     <div
                        className="shadow-md p-5 min-h-[200px] rounded-xl flex items-center gap-6 cursor-pointer bg-[#ffffff72]"
                        onClick={() => PushDataPembukuan()}
                     >
                        <div>
                           <img
                              src="./assets/journaling.jpg"
                              width={100}
                              className="mb-3"
                           ></img>
                           <div className="text-[20px] font-semibold tracking-[1px]">
                              Pembukuaan Pendapatan dan Pengeluaran
                           </div>
                           <div className="text-[16px] text-[#000000ac]">
                             Data perihal pemasukan dan pengeluaran perusahaan
                           </div>
                        </div>
                        <div className="font-semibold">{">"}</div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}

export async function getServerSideProps(context) {
   const { query, req } = context;

   let Data = {
      Nama: query.id,
      access_token: req.cookies.access_token,
   };

   return { props: { Data } };
}
