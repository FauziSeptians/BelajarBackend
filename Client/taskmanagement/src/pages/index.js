import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import Snackbar from "./component/snackbar";
import Cookies from "js-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
   const router = useRouter(null);
   const [InputanNama, setInputanNama] = useState("");
   const [InputanPassword, setInputanPassword] = useState("");
   const [messageLogin, setMessageLogin] = useState();

   const Login = async () => {
      try {
         const response = await axios.post("/api/login", {
            Nama: InputanNama,
            Password: InputanPassword,
         });
         console.log(response.data);
         if (response.data.status == 200) {
            setMessageLogin(response.data.message);
            response.data.additionalData.Role == "Admin"
               ? setTimeout(() => {
                    router.push({
                       pathname: "/admin",
                       query: {
                          id: response.data.additionalData.Nama,
                       },
                    });
                 }, 2000)
               : setTimeout(() => {
                    router.push({
                       pathname: "/pekerja",
                       query: {
                          id: response.data.additionalData.Nama,
                       },
                    });
                 }, 2000);

            Cookies.set(
               "access_token",
               response.data.additionalData.accessToken,
               {
                  expires: 365,
                  secure: true,
                  sameSite: "strict",
               }
            );
         } else {
            setMessageLogin(response.data.message);
            setTimeout(() => {
               setMessageLogin(null);
            }, 3000);
         }
      } catch (error) {
         console.error("Error:", error.response); // Tampilkan detail kesalahan dari server
      }
   };

   console.log("tokenns", Cookies.get("access_token"));

   return (
      <>
         {messageLogin && <Snackbar messageLogin={messageLogin}></Snackbar>}
         <section className="grid grid-cols-2">
            <div className="w-full h-screen bg-[#f7f7f8] p-[180px]">
               <div className="w-full h-full flex flex-col justify-center items-center">
                  <div className="Header">
                     <div className="text-[24px] mb-2">
                        Login To{" "}
                        <b className="tracking-[1.5px]">TMTaskManager</b>
                     </div>
                     <div className="w-[80%] text-[20px] font-light text-[#00000098] leading-[30px]">
                        Melakukan management pekerjaan dengan mudah, cepat dan
                        aman dengan menggunakan{" "}
                        <b className="text-[black]">TM.</b>
                     </div>
                  </div>
                  <div className="flex flex-col gap-3 mt-10 w-full">
                     <Input
                        type="text"
                        label="Nama"
                        className="w-full h-[48px] rounded-none inputan"
                        onChange={(e) => setInputanNama(e.target.value)}
                     />
                     <Input
                        type="password"
                        label="Password"
                        className="w-full h-[48px] rounded-none"
                        onChange={(e) => setInputanPassword(e.target.value)}
                     />
                     <Button
                        className="w-full bg-[#b4fe3a] fs-bold tracking-[1px]"
                        onClick={() => Login()}
                     >
                        Submit
                     </Button>
                  </div>
               </div>
            </div>
            <div className="w-full h-screen bg-[#141414] p-[180px]">
               <div className="w-full h-full flex flex-col justify-center items-center">
                  <div className="Header text-white">
                     <div className="text-[24px] mb-2">
                        Login To{" "}
                        <b className="tracking-[1.5px]">TMTaskManager</b>
                     </div>
                     <div className="w-[80%] text-[20px] font-light text-[#ffffffac] leading-[30px]">
                        Melakukan management pekerjaan dengan mudah, cepat dan
                        aman dengan menggunakan{" "}
                        <b className="text-[white] font-semibold">TM.</b>
                     </div>
                  </div>
                  <div className="flex flex-col gap-3 mt-10 w-full">
                     <Input
                        type="text"
                        label="Nama"
                        className="w-full h-[48px] rounded-none inputan"
                     />
                     <Input
                        type="password"
                        label="Password"
                        className="w-full h-[48px] rounded-none"
                     />
                     <Button className="w-full bg-[#b4fe3a] fs-bold tracking-[1px]">
                        Submit
                     </Button>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}
