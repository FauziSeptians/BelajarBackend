import axios from "axios";
import ConvertTanggal from "../../../../lib/TanggalConvert";
import { useState } from "react";
import { Pagination } from "@nextui-org/react";
import Greetings from "@/pages/component/greetings";
import { useRouter } from "next/router";

export default function dataAllKaryawan({ dataObject, Modals }) {
   console.log(dataObject);

   const [DataKaryawan, setDataKaryawan] = useState(dataObject.dataAllKaryawan);
   const [SearchData, setSearchData] = useState(DataKaryawan);
   const router = useRouter(null);

   function HandlingSearchInput(inputan) {
      console.log(inputan);

      console.log(inputan.toLowerCase());

      if (inputan.length != 0) {
         let filterData = DataKaryawan.filter((e) => {
            console.log(e);
            console.log(ConvertTanggal(e.TanggalKeanggotaan).toLowerCase());
            if (
               e.Nama.toLowerCase().includes(inputan.toLowerCase()) ||
               e.Notelp.toLowerCase().includes(inputan.toLowerCase()) ||
               e.Umur.toString()
                  .toLowerCase()
                  .includes(inputan.toLowerCase()) ||
               ConvertTanggal(e.TanggalKeanggotaan)
                  .toLowerCase()
                  .includes(inputan.toLowerCase())
            ) {
               return e;
            }
         });

         setSearchData(filterData);

         console.log(filterData);
      } else {
         setSearchData(DataKaryawan);
      }
   }

   function setNumberPaging(number) {
      console.log(number);
      let batasAtas = number * 10 - 1;
      let batasbawah = batasAtas - 9;

      let filterData = DataKaryawan.filter((e, index) => {
         if (index >= batasbawah && index <= batasAtas) {
            return e;
         }
      });

      setSearchData(filterData);
   }

   function Whatsapp(value) {
      const whatsappURL = `https://wa.me/${value}`;
      const newWindow = window.open(whatsappURL, "_blank");
   }

   console.log(SearchData);

   return (
      <section className=" w-full ">
         <div className="content w-full h-screen">
            <Greetings
               Username={dataObject.User}
               Modals={(e) => Modals(e)}
            ></Greetings>

            <div className="mt-7 TaskManagement ">
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
               <div className="flex flex-col gap-5 mt-5 text-center ">
                  <div className="grid grid-cols-12 bg-[#000000] text-[#8bcf1d] tracking-[2px] p-5 rounded-t-[10px]">
                     <div className="col-span-1 ">No</div>
                     <div className="col-span-3 ">Nama</div>
                     <div className="col-span-2 ">Notelp</div>
                     <div className="col-span-2 ">Umur</div>
                     <div className="col-span-4 ">TanggalKeanggotaan</div>
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
                                 <div className="col-span-3  ">{item.Nama}</div>
                                 <div
                                    className="col-span-2 cursor-pointer"
                                    onClick={() => Whatsapp(item.Notelp)}
                                 >
                                    {item.Notelp}
                                 </div>
                                 <div className="col-span-2 ">{item.Umur}</div>
                                 <div className="col-span-4 break-all p-3">
                                    {item.TanggalKeanggotaan &&
                                       ConvertTanggal(item.TanggalKeanggotaan)}
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
            <div className="w-full flex justify-center mt-5">
               <Pagination
                  loop
                  showControls={
                     Math.ceil(SearchData.length / 10) == 1 ? false : true
                  }
                  color=""
                  total={Math.ceil(SearchData.length / 10)}
                  initialPage={1}
                  onChange={(e) => setNumberPaging(e)}
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
         .get("http://localhost:5000/getAllKaryawan", {
            headers: {
               Authorization: "Bearer " + context.req.cookies.access_token,
            },
         })
         .catch((err) => console.log(err.message));

      let dataAllKaryawan = response.data.additionalData;
      const dataObject = {
         User: context.query.id,
         dataAllKaryawan: dataAllKaryawan,
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
