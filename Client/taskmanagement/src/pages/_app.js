import "@/styles/globals.css";
import Layout from "./layout";
import { useRouter } from "next/router";
import { useState } from "react";

export default function App({ Component, pageProps }) {
   const routes = useRouter();

   const [statusModalAbsensi, setStatusModalAbsensi] = useState(false);
   const [FormAbsensi , setFormAbsensi] = useState(null);

   function HandlingModalsAbsen(form){
      console.log(form);
      setStatusModalAbsensi(true)
      setFormAbsensi(form);
   }

   console.log(routes.pathname);

   return routes.route == "/" || routes.route == "/authorize" ? (
      <Component {...pageProps} />
   ) : (
      <Layout statusModalTrue={statusModalAbsensi} form={FormAbsensi} statusModalFalse={() => setStatusModalAbsensi(false)}>
         <Component {...pageProps} Modals={(e) => HandlingModalsAbsen(e)} />
      </Layout>
   );
}
