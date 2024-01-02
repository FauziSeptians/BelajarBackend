import { Inter } from "next/font/google";
import { useState } from "react";
import axios from "axios";
import ConvertTanggal from "../../../lib/TanggalConvert";
import ConvertJam from "../../../lib/JamConvert";
import Greetings from "../component/greetings";

export default function TaskManagement({ dataObject, Modals }) {
   const Username = dataObject.User;
   console.log(dataObject);
   console.log(dataObject.dataTask);
   return (
      <section className=" w-full ">
         <div className="content w-full h-screen">
            <div className="Greetings text-[20px]">
               <Greetings
                  Username={Username}
                  Modals={(e) => Modals(e)}
               ></Greetings>
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
               {dataObject.dataTask.length != 0 ? (
                  dataObject.dataTask.map((item, index) => {
                     return (
                        <div className="flex flex-col gap-5 text-center">
                           <div className="grid grid-cols-12 min-h-[48px] border-y-1 border-[#00000030] items-center">
                              <div className="col-span-1 ">{index + 1}</div>
                              <div className="col-span-3  ">
                                 {item.TanggalMasuk}
                              </div>
                              <div className="col-span-2 ">
                                 {ConvertJam(item.JamMasuk)}
                              </div>
                              <div className="col-span-2 ">
                                 {item.JamKeluar
                                    ? ConvertJam(item.JamKeluar)
                                    : "-"}
                              </div>
                              <div className="col-span-4 break-all p-3">
                                 {item.Keterangan ? item.Keterangan : "-"}
                              </div>
                           </div>
                        </div>
                     );
                  })
               ) : (
                  <div className="flex flex-col gap-5 text-center">
                     <div className="grid grid-cols-12 min-h-[48px] border-y-1 border-[#00000030] items-center">
                        <div className="col-span-1 ">-</div>
                        <div className="col-span-3  ">-</div>
                        <div className="col-span-2 ">-</div>
                        <div className="col-span-2 ">-</div>
                        <div className="col-span-4   break-all p-1">-</div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </section>
   );
}

export async function getServerSideProps(context) {
   const { query } = context;
   let Nama = query.id;
   console.log(Nama);
   try {
      const validateRes = await axios.post(
         "http://localhost:5000/validateUser",
         {
            Nama: Nama,
            Token: context.req.cookies.access_token,
         },
         {
            headers: {
               Authorization: "bearer " + context.req.cookies.access_token,
            },
         }
      );

      console.log(validateRes.data);

      if (validateRes.data.status == 200) {
         const res = await axios.post("http://localhost:3000/api/getalltask", {
            Nama: Nama,
            Token: context.req.cookies.access_token,
         });

         let dataObject = {
            User: validateRes.data.additionalData.Nama,
            dataTask: res.data,
         };

         console.log(dataObject);
         return {
            props: { dataObject },
         };
      } else {
         context.res.setHeader(
            "Set-Cookie",
            "access_token=; Max-Age=0; Path=/; HttpOnly"
         );
         context.res.writeHead(302, { Location: "/" });
         context.res.end();
         return { props: {} }; // Penting untuk memberikan nilai props kosong saat melakukan redirect
      }
   } catch (error) {
      console.error("Error fetching data:", error);
      return {
         props: { error: error.message },
      };
   }
}
