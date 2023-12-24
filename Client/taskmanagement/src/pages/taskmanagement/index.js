import { Inter } from "next/font/google";

export default function TaskManagement() {
   return (
      <section className=" w-full ">
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
            <div className="mt-7 TaskManagement ">
               <div className="text-[20px] font-semibold tracking-[0.5px] pb-2 ">
                  TASK MANAGEMENT
               </div>
               <div className="flex flex-col gap-5 mt-3 text-center font-semibold tracking-wider">
                  <div className="grid grid-cols-12 bg-[#00000030] p-3">
                     <div className="col-span-1 ">No</div>
                     <div className="col-span-3 ">Tanggal Masuk</div>
                     <div className="col-span-2 ">Jam Masuk</div>
                     <div className="col-span-2 ">Jam Keluar</div>
                     <div className="col-span-4 ">Keterangan Pekerjaan</div>
                  </div>
               </div>
               <div className="flex flex-col gap-5 text-center">
                  <div className="grid grid-cols-12 min-h-[48px] border-y-1 border-[#00000030] items-center">
                     <div className="col-span-1 ">1</div>
                     <div className="col-span-3  ">23 Desember 2023</div>
                     <div className="col-span-2 ">08:20 Pagi</div>
                     <div className="col-span-2 ">17:00 Sore</div>
                     <div className="col-span-4   break-all p-1">
                        Aku mengerjakan lorem
                        aowdakodaksodkoasdlaodlosakodakoksokdoakdoakodakoskdoakdoskodskdosakosakdoakoskodkaoskdoa
                     </div>
                  </div>
               </div>
               <div className="flex flex-col gap-5 text-center">
                  <div className="grid grid-cols-12 min-h-[48px] border-y-1 border-[#00000030] items-center">
                     <div className="col-span-1 ">1</div>
                     <div className="col-span-3  ">23 Desember 2023</div>
                     <div className="col-span-2 ">08:20 Pagi</div>
                     <div className="col-span-2 ">17:00 Sore</div>
                     <div className="col-span-4   break-all p-1">
                        Aku mengerjakan lorem
                        aowdakodaksodkoasdlaodlosakodakoksokdoakdoakodakoskdoakdoskodskdosakosakdoakoskodkaoskdoa
                     </div>
                  </div>
               </div>
               <div className="flex flex-col gap-5 text-center">
                  <div className="grid grid-cols-12 min-h-[48px] border-y-1 border-[#00000030] items-center">
                     <div className="col-span-1 ">1</div>
                     <div className="col-span-3  ">23 Desember 2023</div>
                     <div className="col-span-2 ">08:20 Pagi</div>
                     <div className="col-span-2 ">17:00 Sore</div>
                     <div className="col-span-4   break-all p-1">
                        Aku mengerjakan lorem
                        aowdakodaksodkoasdlaodlosakodakoksokdoakdoakodakoskdoakdoskodskdosakosakdoakoskodkaoskdoa
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
