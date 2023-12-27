import axios from "axios";
import JamConvert from "../../../../lib/JamConvert";

export default function TaskManagementKaryawan({ dataObject }) {
   console.log(dataObject);
   return (
      <section className=" w-full ">
         <div className="content w-full h-screen">
            <div className="Greetings text-[20px]">
               <div className="text-[28px] font-semibold tracking-[2px]">
                  Hi,{" "}
                  <span className="text-[24px] font-light tracking-[1px]">
                     {dataObject.User}
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
                     <div className="col-span-3 ">Nama</div>
                     <div className="col-span-2 ">Tanggal Masuk</div>
                     <div className="col-span-2 ">Jam Kerja</div>
                     <div className="col-span-4 ">Deskripsi</div>
                  </div>
               </div>
               {dataObject.dataAllTaskKaryawan.length != 0 ? (
                  dataObject.dataAllTaskKaryawan.map((item, index) => {
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
   } catch (error) {}
}
