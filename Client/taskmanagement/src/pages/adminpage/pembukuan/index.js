import axios from "axios";
import ConvertTanggal from "../../../../lib/TanggalConvert";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { Pagination } from "@nextui-org/react";
import Greetings from "@/pages/component/greetings";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { FormatCurrency } from "../../../../lib/formatCurrency";
import { NumberingFormat } from "../../../../lib/numberingformat";

export default function dataAllKaryawan({ dataObject, Modals }) {
   console.log(dataObject);

   const [Deskripsi, sethandlingDeskripsi] = useState();
   const [Jumlah, sethandlingJumlah] = useState();
   const [Harga, sethandlingHarga] = useState();
   const [HargaTotal, sethandlingTotalHarga] = useState();
   const [InputKategori, sethandlingKategori] = useState();
   const [NotFilledEror, setNotFilledEror] = useState(true);
   const [PerhitunganTotal, setPerhitunganTotal] = useState();
   const [PerhitunganHarga, setPerhitunganHarga] = useState();
   const [SearchData, setSearchData] = useState(dataObject.dataPembukuan);
   const Kategori = ["Pengeluaran", "Pendapatan"];
   const router = useRouter();

   function setNumberPaging(number) {
      console.log(number);
      let batasAtas = number * 10 - 1;
      let batasbawah = batasAtas - 9;

      let filterData = dataObject.dataPembukuan.filter((e, index) => {
         if (index >= batasbawah && index <= batasAtas) {
            return e;
         }
      });

      setSearchData(filterData);
   }

   async function onSubmit() {
      console.log(HargaTotal);
      console.log(Harga);
      console.log(Deskripsi);
      console.log(Jumlah);
      console.log(InputKategori);
      if (PerhitunganHarga) {
         const response = await axios.post("/api/pembukuan", {
            Deskripsi: Deskripsi,
            Kategori: InputKategori,
            Jumlah: Jumlah,
            Harga: PerhitunganHarga,
            TotalHarga: HargaTotal,
         });

         if (response.data.status == 200) {
            router.replace(router.asPath);
         }

         console.log(response.data);
      } else {
         const response = await axios.post("/api/pembukuan", {
            Deskripsi: Deskripsi,
            Kategori: InputKategori,
            Jumlah: Jumlah,
            Harga: Harga,
            TotalHarga: PerhitunganTotal,
         });

         if (response.data.status == 200) {
            router.replace(router.asPath);
         }

         console.log(response.data);
      }
   }

   console.log(Harga);

   useEffect(() => {
      if ((HargaTotal || Harga) && Deskripsi && Jumlah && InputKategori) {
         setNotFilledEror(false);
      }
      if (HargaTotal < 0 || Harga < 0) {
         setNotFilledEror(false);
      }

      if (Harga == "" || HargaTotal == "") {
         if (Harga == "") {
            // sethandlingHarga(0);
            // sethandlingTotalHarga(0)
         } else {
            console.log(HargaTotal);
            setPerhitunganTotal(null);
            sethandlingTotalHarga(null);
            sethandlingHarga(0);
         }
      } else if (Harga) {
         console.log(Harga);
         if (Harga && HargaTotal) {
            sethandlingHarga(HargaTotal / Jumlah);
         } else {
            setPerhitunganTotal(Harga * Jumlah);
         }
      } else if (HargaTotal) {
         console.log(HargaTotal);
         if (HargaTotal && Harga) {
            sethandlingTotalHarga(Harga * Jumlah);
         } else {
            setPerhitunganHarga(HargaTotal / Jumlah);
         }
      }
   }, [Deskripsi, HargaTotal, Harga, Jumlah, Kategori]);

   function HandlingSearchInput(inputan) {
      console.log(inputan);

      console.log(inputan.toLowerCase());

      if (inputan.length != 0) {
         let filterData = dataObject.dataPembukuan.filter((e) => {
            console.log(e);
            console.log(ConvertTanggal(e.TanggalKeanggotaan).toLowerCase());
            if (
               e.Deskripsi.toLowerCase().includes(inputan.toLowerCase()) ||
               e.Kategori.toLowerCase().includes(inputan.toLowerCase()) ||
               e.Jumlah.toString().toLowerCase().includes(inputan.toLowerCase()) || 
               e.Harga.toString().toLowerCase().includes(inputan.toLowerCase()) || 
               e.TotalHarga.toString().toLowerCase().includes(inputan.toLowerCase())
            ) {
               return e;
            }
         });

         setSearchData(filterData);

      } else {
         setSearchData(dataObject.dataPembukuan);
      }
   }

   return (
      <section className=" w-full">
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
               </div>

               <div className=" mt-5 p-[50px] gap-4 rounded-lg bg-[#aeaeae1b]">
                  <div>
                     <div className="grid grid-cols-2 gap-5 items-center">
                        <div className="w-full ">
                           <div className="mb-2">Deskripsi</div>
                           <input
                              type="text"
                              placeholder="Deskripsi Barang"
                              name="deskripsi"
                              onChange={(e) =>
                                 sethandlingDeskripsi(e.target.value)
                              }
                              className="rounded-lg h-[56px] w-full outline p-3 outline-[#2424244b] outline-[0.5px]"
                           ></input>
                        </div>
                        <div className="w-full ">
                           <div className="mb-2">Kategori</div>
                           <Select
                              label="Pilih kategori"
                              className="w-ful"
                              id="selection"
                              name="kategori"
                              onChange={(e) => {
                                 sethandlingKategori(e.target.value);
                              }}
                           >
                              {Kategori.map((el) => (
                                 <SelectItem key={el} value={el}>
                                    {el}
                                 </SelectItem>
                              ))}
                           </Select>
                        </div>
                     </div>
                     <div className="grid grid-cols-3 gap-5 mt-6">
                        <div className="w-full">
                           <div className="mb-2">Jumlah</div>
                           <input
                              type="number"
                              placeholder="Search"
                              name="Jumlah"
                              onChange={(e) =>
                                 sethandlingJumlah(e.target.value)
                              }
                              className="rounded-lg h-[40px] w-full outline p-3 outline-[#2424244b] outline-[0.5px]"
                           ></input>
                        </div>
                        <div className="w-full">
                           <div className="mb-2">Harga</div>
                           <input
                              type="number"
                              name="Harga"
                              placeholder="Search"
                              value={
                                 Harga == undefined
                                    ? PerhitunganHarga
                                    : Harga == null
                                    ? null
                                    : Harga
                              }
                              disabled={Jumlah && HargaTotal ? true : false}
                              onChange={(e) => sethandlingHarga(e.target.value)}
                              className="rounded-lg h-[40px] w-full outline p-3 outline-[#2424244b] outline-[0.5px]"
                           ></input>
                        </div>
                        <div className="w-full">
                           <div className="mb-2">Total harga</div>
                           <input
                              type="number"
                              name="TotalHarga"
                              placeholder="Search"
                              value={
                                 HargaTotal == undefined || HargaTotal == 0
                                    ? PerhitunganTotal
                                    : HargaTotal == null
                                    ? null
                                    : HargaTotal
                              }
                              disabled={Harga && Jumlah ? true : false}
                              onChange={(e) =>
                                 sethandlingTotalHarga(e.target.value)
                              }
                              className="rounded-lg h-[40px] w-full outline p-3 outline-[#2424244b] outline-[0.5px]"
                           ></input>
                        </div>
                     </div>
                  </div>
                  {NotFilledEror ? (
                     <Button
                        className="w-full bg-[#bcbcbc] fs-bold tracking-[1px] mt-8"
                        disabled
                        onClick={() => onSubmit()}
                     >
                        Submit
                     </Button>
                  ) : (
                     <Button
                        className="w-full bg-[#b4fe3a] fs-bold tracking-[1px] mt-8 cursor-pointer"
                        onClick={() => onSubmit()}
                     >
                        Submit
                     </Button>
                  )}
               </div>

               <div className="mt-10 flex justify-between  items-center">
                  <div className="bg-[#b4fe3a] fs-bold tracking-[1px] px-4 py-2 rounded-md cursor-pointer" onClick={() => Modals({type : "Pembukuan", Nama : dataObject.User})}>
                     Summary
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

               <div className="flex flex-col gap-5 mt-3 text-center ">
                  <div className="grid grid-cols-12 bg-[#000000] text-[#8bcf1d] tracking-[2px] p-5 rounded-t-[10px]">
                     <div className="col-span-1 ">No</div>
                     <div className="col-span-3 ">Deskrispi</div>
                     <div className="col-span-2 ">Kategori</div>
                     <div className="col-span-2 ">Jumlah</div>
                     <div className="col-span-2 ">Harga</div>
                     <div className="col-span-2 ">Harga Total</div>
                  </div>
               </div>
               <div
                  className={`${
                     SearchData.length > 10 ? "min-h-[600px]" : ""
                  }`}
               >
                  {SearchData.length != 0 ? (
                     SearchData.map((item, index) => {
                        return (
                           <div className="flex flex-col gap-5 text-center">
                              <div className="grid grid-cols-12 min-h-[48px] border-y-1 border-[#00000030] items-center">
                                 <div className="col-span-1 ">{index + 1}</div>
                                 <div className="col-span-3 ">
                                    {item.Deskripsi}
                                 </div>
                                 <div
                                    className={`col-span-2 ${
                                       item.Kategori == "Pengeluaran"
                                          ? "text-[red]"
                                          : "text-[green]"
                                    } tracking-[0.5px] font-normal`}
                                 >
                                    {item.Kategori}
                                 </div>
                                 <div className="col-span-2 ">
                                    {NumberingFormat(item.Jumlah)}
                                 </div>
                                 <div className="col-span-2 ">
                                    {FormatCurrency(item.Harga)}
                                 </div>
                                 <div className="col-span-2 ">
                                    {FormatCurrency(item.TotalHarga)}
                                 </div>
                              </div>
                           </div>
                        );
                     })
                  ) : (
                     <div className="flex flex-col gap-5 text-center">
                        <div className="grid grid-cols-12 min-h-[48px] border-y-1 border-[#00000030] items-center">
                           <div className="col-span-1 ">-</div>
                           <div className="col-span-3 ">-</div>
                           <div className="col-span-2 ">-</div>
                           <div className="col-span-2 ">-</div>
                           <div className="col-span-2 ">-</div>
                           <div className="col-span-2 ">-</div>
                        </div>
                     </div>
                  )}
               </div>
            </div>
            <div className="w-full flex justify-center mt-8">
               <Pagination
                  loop
                  showControls={
                     Math.ceil(SearchData.length / 10) == 1
                        ? false
                        : true
                  }
                  color="success"
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
   const { req } = context;
   try {
      if (!req.cookies.access_token) {
         throw new Error("Session login sudah abis");
      }

      console.log(context.query.id);

      console.log(context.query);

      console.log(req.cookies.access_token);

      const response = await fetch("http://localhost:5000/getDatapembukuan", {
         method: "POST",
         headers: {
            Authorization: `Bearer ${req.cookies.access_token}`,
         },
      });

      const data = await response.json();

      const dataObject = {
         User: context.query.id,
         dataPembukuan: data.additionalData,
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
