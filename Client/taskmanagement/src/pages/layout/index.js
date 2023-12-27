import Sidebar from "../component/sidebar";
import Absensi from "../component/modals/absensi";
import Snackbar from "../component/snackbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Layout = ({
   children,
   statusModalTrue,
   statusModalFalse,
   form,
   dataUser,
}) => {
   const [message, setMessage] = useState("");
   const routes = useRouter(null);

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
   }, []);

   useEffect(() => {
      setTimeout(() => {
         setMessage("");
      }, 5000);
   }, [message]);
   return (
      <div className="flex w-screen h-screen bg-black">
         {message && <Snackbar message={message}></Snackbar>}
         {statusModalTrue && (
            <Absensi
               statusModal={() => statusModalFalse()}
               formType={form.type}
               Nama={form.Nama}
               message={(e) => setMessage(e)}
            ></Absensi>
         )}
         <Sidebar></Sidebar>
         <div className="w-full bg-[#f7f7f8] overflow-hidden p-[30px]">
            {children}
         </div>
      </div>
   );
};

export async function getServerSideProps(context) {
   const { query, req } = context;

   let Data = {
      Nama: query.id,
      Token: req.cookies.access_token,
   };

   console.log(req.cookies.access_token);

   const response = await axios
      .post("http://localhost:5000/validateUser", Data, {
         Headers: {
            Authorization: `Bearer ${req.cookies.access_token}`,
         },
      })
      .catch((err) => {
         console.log(err.message);
      });
   console.log("testsss");
   console.log(response);

   return { props: { dataUser } };
}

export default Layout;
