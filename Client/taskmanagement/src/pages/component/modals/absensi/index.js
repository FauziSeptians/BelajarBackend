import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const Absensi = () => {
   return (
      <>
         <div className="absolute m-0 p-0 bg-[#b2b2b251] w-full h-full flex justify-center items-center cursor-pointer">
            <div className="card p-7 rounded-lg bg-white flex flex-col gap-4 w-[30%] text-[16px] text-[#00000098]">
               <div className="text-[24px] font-semibold text-black mb-3">
                  FORM ABSENSI
               </div>
               <div className=" w-full h-[250px] flex items-center justify-center">
                  <div className="bg-[#b2b2b251] h-full w-[250px] rounded-full flex items-center justify-center relative">
                     <input
                        type="file"
                        className="w-full h-full opacity-5 absolute inset-0"
                     ></input>
                     {/* <div className="absolute inset-0 top-5">
                        <div className="flex flex-col gap-2 justify-center items-center bg-red-400">
                           <img src="assets/camera.png" width={48}></img>
                           <div>Masukan Fotomu</div>
                        </div>
                     </div> */}
                  </div>
               </div>
               <div className="flex flex-col gap-2">
                  <div>Masukan password</div>
                  <Input
                     type="password"
                     label="Password"
                     className="w-full h-[48px] rounded-none"
                  />
               </div>
               <div className="flex gap-3 mt-4">
                  <Button className="w-full bg-[black] fs-bold tracking-[1px] text-white">
                     Kembali
                  </Button>
                  <Button className="w-full bg-[#b4fe3a] fs-bold tracking-[1px]">
                     Submit
                  </Button>
               </div>
            </div>
         </div>
      </>
   );
};

export default Absensi;
