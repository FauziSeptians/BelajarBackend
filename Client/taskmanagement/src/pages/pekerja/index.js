import { Inter } from "next/font/google";
import Absensi from "../component/modals/absensi";

export default function Pekerja() {
   return (
      <>
         <section className=" w-full relative">
            <Absensi></Absensi>
            <div className="content w-full h-screen">
               <div className="Greetings text-[20px]">
                  <div className="text-[28px] font-semibold tracking-[2px]">
                     Hi,{" "}
                     <span className="text-[24px] font-light tracking-[1px]">
                        Muhammad Fauzi Septiana Putra
                     </span>
                  </div>
                  <div className="font-light text-[#000000ac]">
                     Motivational Quotes
                  </div>
               </div>
               <div className="mt-7 TaskManagement">
                  <div className="text-[20px] font-semibold tracking-[0.5px] pb-2 ">
                     Home Page
                  </div>
                  <div className="grid grid-cols-3 gap-7 mt-3">
                     <div className="shadow-md p-5 min-h-[200px] rounded-xl flex items-center gap-6 cursor-pointer bg-[#ffffff72]">
                        <div>
                           <img
                              src="./assets/kalender.jpg"
                              width={80}
                              className="mb-3"
                           ></img>
                           <div className="text-[20px] font-semibold tracking-[1px]">
                              ABSENSI
                           </div>
                           <div className="text-[16px] text-[#000000ac]">
                              Data Kehadiranmu dari kamu masuk kerja dan pulang
                              kerja
                           </div>
                        </div>
                        <div className="font-semibold">{">"}</div>
                     </div>
                     <a
                        className="shadow-md p-5 min-h-[200px] rounded-xl flex items-center gap-6 cursor-pointer bg-[#ffffff72]"
                        href="/taskmanagement"
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
                              Data Kehadiranmu dari kamu masuk kerja dan pulang
                              kerja
                           </div>
                        </div>
                        <div className="font-semibold">{">"}</div>
                     </a>
                     <div className="shadow-md p-5 min-h-[200px] rounded-xl flex items-center gap-6 cursor-pointer bg-[#ffffff72]">
                        <div>
                           <img
                              src="./assets/kalender.jpg"
                              width={80}
                              className="mb-3"
                           ></img>
                           <div className="text-[20px] font-semibold tracking-[1px]">
                              ABSENSI
                           </div>
                           <div className="text-[16px] text-[#000000ac]">
                              Data Kehadiranmu dari kamu masuk kerja dan pulang
                              kerja
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
