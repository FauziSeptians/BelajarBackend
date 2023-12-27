import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const BuatDataKaryawan = () => {
   return (
      <div className="w-full h-full flex justify-center items-center">
         <div className="w-[40%] bg-slate-100 p-10 rounded-xl shadow-xl">
            <div className=" pb-3 border-b-1">
               <div className="Header text-[20px] font-semibold tracking-wide">
                  Form karyawan baru
               </div>
               <div className="subheader text-[14px] text-[#0000007b]">
                  Formulir untuk pembuatan data karyawan baru yang masuk di
                  perusahaan anda
               </div>
            </div>

            <div className="mt-5 flex flex-col gap-5">
               <div className="grid grid-cols-2 gap-4">
                  <Input
                     type="text"
                     label="Nama"
                     className="w-full h-[48px] rounded-none"
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                     type="text"
                     label="Tanggal Lahir"
                     className="w-full h-[48px] rounded-none"
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>

               <Input
                  type="text"
                  label="No Telp"
                  className="w-full h-[48px] rounded-none"
                  onChange={(e) => setPassword(e.target.value)}
               />
               <Input
                  type="password"
                  label="Password"
                  className="w-full h-[48px] rounded-none"
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <div className="mt-4">
               <Button
                  className="w-full bg-[#b4fe3a] fs-bold tracking-[1px]"
                  onClick={() => SubmitAbsensi()}
               >
                  Submit
               </Button>
            </div>
         </div>
      </div>
   );
};

export default BuatDataKaryawan;
