import axios from "axios";
import JamConvert from "../../../../lib/JamConvert";
import { Input } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import { useState } from "react";
import Greetings from "@/pages/component/greetings";

export default function TaskManagementKaryawan({ dataObject, Modals }) {
   console.log(dataObject);

   const [DataTaskKaryawan, setDataKaryawan] = useState(
      dataObject.dataAllTaskKaryawan
   );

   const [SearchData, setSearchData] = useState(DataTaskKaryawan);

   function HandlingSearchInput(inputan) {
      console.log(inputan);

      console.log(inputan.toLowerCase());

      if (inputan.length != 0) {
         let filterData = DataTaskKaryawan.filter((e) => {
            console.log(e);
            if (
               e.TanggalMasuk.toLowerCase().includes(inputan.toLowerCase()) ||
               e.IDPekerja.Nama.toLowerCase().includes(inputan.toLowerCase()) ||
               e.Keterangan.toString()
                  .toLowerCase()
                  .includes(inputan.toLowerCase()) ||
               JamConvert(e.JamMasuk)
                  .toLowerCase()
                  .includes(inputan.toLowerCase()) ||
               JamConvert(e.JamKeluar)
                  .toLowerCase()
                  .includes(inputan.toLowerCase())
            ) {
               return e;
            }
         });

         setSearchData(filterData);

         console.log(filterData);
      } else {
         setSearchData(DataTaskKaryawan);
      }
   }

   return (
      <section className=" w-full ">
         <div className="content w-full h-screen">
            <Greetings
               Username={dataObject.User}
               Modals={(e) => Modals(e)}
            ></Greetings>
            <div className="mt-7 TaskManagement">
               <div className="flex justify-between items-center">
                  <div className="text-[24px] font-semibold tracking-[0.5px] pb-2 ">
                     TASK MANAGEMENT
                  </div>
                  <div>
                     <input
                        type="text"
                        placeholder="Search"
                        onChange={(e) => HandlingSearchInput(e.target.value)}
                        className="rounded-lg h-[40px] w-[400px] outline p-3 outline-[#2424244b] outline-[0.5px]"
                     ></input>
                  </div>
               </div>
               <div className="flex flex-col gap-5 mt-5 text-center font-semibold tracking-wider">
                  <div className="grid grid-cols-12 bg-[#000000] text-[#8bcf1d] tracking-[2px] p-5 rounded-t-[10px]">
                     <div className="col-span-1 ">No</div>
                     <div className="col-span-3 ">Nama</div>
                     <div className="col-span-2 ">Tanggal Masuk</div>
                     <div className="col-span-2 ">Jam Kerja</div>
                     <div className="col-span-4 ">Deskripsi</div>
                  </div>
               </div>
               <div
                  className={`${SearchData.length > 10 ? "min-h-[600px]" : ""}`}
               >
                  {SearchData.length != 0 ? (
                     SearchData.map((item, index) => {
                        return (
                           <div className="flex flex-col gap-5 text-center">
                              <div className="grid grid-cols-12 min-h-[48px] border-y-1 border-[#00000030] items-center">
                                 <div className="col-span-1 ">{index + 1}</div>
                                 <div className="col-span-3  ">
                                    {item.IDPekerja.Nama}
                                 </div>
                                 <div className="col-span-2 ">
                                    {item.TanggalMasuk}
                                 </div>
                                 <div className="col-span-2 ">
                                    {item.JamMasuk
                                       ? JamConvert(item.JamMasuk)
                                       : ""}{" "}
                                    -{" "}
                                    {item.JamKeluar
                                       ? JamConvert(item.JamKeluar)
                                       : ""}
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
            <div className="mt-5 w-full flex justify-center">
               <Pagination
                  loop
                  showControls={
                     Math.ceil(SearchData.length / 10) == 1 ? false : true
                  }
                  color=""
                  total={Math.ceil(SearchData.length / 10)}
                  initialPage={1}
               />
            </div>
         </div>
      </section>
   );
}

export async function getServerSideProps(context) {
   try {
      console.log("test");

      const response = await axios
         .get("http://localhost:5000/getAllTaskKaryawan", {
            headers: {
               Authorization: "Bearer " + context.req.cookies.access_token,
            },
         })
         .catch((err) => console.log(err.message));

      let dataAllTaskKaryawan = response.data.additionalData;
      const dataObject = {
         User: context.query.id,
         dataAllTaskKaryawan: dataAllTaskKaryawan,
      };

      return {
         props: { dataObject },
      };
   } catch (error) {
      return {
         redirect: {
            destination: "/", // Ganti dengan rute halaman yang sesuai
            permanent: false,
         },
      };
   }
}
