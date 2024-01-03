import { Inter } from "next/font/google";
import Absensi from "../component/modals/absensi";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { User } from "@nextui-org/react";
import Greetings from "../component/greetings";

export default function Pekerja({ Data, Modals }) {
   const Username = Data.Nama;
   const routes = useRouter(null);
   const dates = new Date();
   const jamsekarang = dates.getHours();

   function pushPath() {
      routes.push({
         pathname: "/taskmanagement",
         query: {
            id: Username,
         },
      });
   }

   return (
      <>
         <section className=" w-full relative">
            <div className="content w-full h-screen">
               <div className="Greetings text-[20px]">
                  <Greetings
                     Username={Username}
                     Modals={(e) => Modals(e)}
                  ></Greetings>
               </div>
               <div className="mt-7 TaskManagement">
                  <div className="text-[20px] font-semibold tracking-[0.5px] pb-2 ">
                     Home Page
                  </div>
                  <div className="grid grid-cols-3 gap-7 mt-3">
                     <div
                        className={`shadow-md p-5 min-h-[200px] rounded-xl flex items-center gap-6 cursor-pointer bg-[#ffffff72]`}
                        onClick={() =>
                           Modals({
                              type: "Masuk",
                              Nama: Username,
                           })
                        }
                     >
                        <div>
                           <img
                              src="./assets/kalender.jpg"
                              width={80}
                              className="mb-3"
                           ></img>
                           <div className="text-[20px] font-semibold tracking-[1px]">
                              ABSENSI Masuk
                           </div>
                           <div className="text-[16px] text-[#000000ac]">
                              Data Kehadiranmu dari kamu masuk kerja dan pulang
                              kerja
                           </div>
                        </div>
                        <div className="font-semibold">{">"}</div>
                     </div>
                     <div
                        className="shadow-md p-5 min-h-[200px] rounded-xl flex items-center gap-6 cursor-pointer bg-[#ffffff72]"
                        onClick={() =>
                           Modals({
                              type: "Pulang",
                              Nama: Username,
                           })
                        }
                     >
                        <div>
                           <img
                              src="./assets/kalender.jpg"
                              width={80}
                              className="mb-3"
                           ></img>
                           <div className="text-[20px] font-semibold tracking-[1px]">
                              ABSENSI Pulang
                           </div>
                           <div className="text-[16px] text-[#000000ac]">
                              Data Kehadiranmu dari kamu masuk kerja dan pulang
                              kerja
                           </div>
                        </div>
                        <div className="font-semibold">{">"}</div>
                     </div>
                     <div
                        className="shadow-md p-5 min-h-[200px] rounded-xl flex justify-between items-center gap-6 cursor-pointer bg-[#ffffff72]"
                        onClick={() => pushPath()}
                     >
                        <div>
                           <img
                              src="./assets/management.jpg"
                              width={80}
                              className="mb-3"
                           ></img>
                           <div className="text-[20px] font-semibold tracking-[1px]">
                              Manajemen Tugas
                           </div>
                           <div className="text-[16px] text-[#000000ac]">
                              List kerjaan yang selama ini kamu lakukan
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
