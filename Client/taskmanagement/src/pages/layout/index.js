import Sidebar from "../component/sidebar";
import Absensi from "../component/modals/absensi";
import Snackbar from "../component/snackbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Spinner } from "@nextui-org/react";

export default function Layout({
   children,
   statusModalTrue,
   statusModalFalse,
   form,
   Data,
}) {
   const [message, setMessage] = useState("");
   const routes = useRouter(null);
   const [loader, setLoader] = useState(false);
   console.log("testz");
   console.log(Data);

   useEffect(() => {
      const Validate = async () => {
         const response = await axios.post("/api/validateUser", {
            Nama: routes.query.id,
         });

         console.log(response.data);

         if (response.data.status == 200) {
            if (response.data.additionalData.Role == "Admin") {
               if (!routes.pathname.includes("admin")) {
                  routes.push({
                     pathname: "/authorize",
                  });
               }
            } else if (response.data.additionalData.Role == "Karyawan") {
               if (routes.pathname.includes("admin")) {
                  routes.push({
                     pathname: "/authorize",
                  });
               }
            }
         }
      };

      Validate();
   }, [routes]);

   useEffect(() => {
      setTimeout(() => {
         setMessage("");
      }, 5000);
   }, [message]);

   useEffect(() => {
      setLoader(true);
      setTimeout(() => {
         setLoader(false);
      }, 1000);
   }, [routes]);

   console.log(loader);
   return (
      <>
         {loader && (
            <div className="fixed w-full h-screen  bg-[#b2b2b251] z-[1000000] flex justify-center items-center">
               <Spinner label="Loading..." color="warning" size="lg" />
            </div>
         )}
         <div className="flex w-screen h-screen bg-black">
            {message && <Snackbar messageLogin={message}></Snackbar>}
            {statusModalTrue && (
               <Absensi
                  statusModal={() => statusModalFalse()}
                  formType={form.type}
                  Nama={form.Nama}
                  message={(e) => setMessage(e)}
               ></Absensi>
            )}
            <Sidebar></Sidebar>
            <div className="w-full bg-[#f7f7f8] overflow-y-auto p-[30px]">
               {children}
            </div>
         </div>
      </>
   );
}

export async function getServerSideProps({ context }) {
   let Data = "awdawdwa";
   console.log("mew");
   console.log(Data);
   return {
      props: { Data },
   };
}
