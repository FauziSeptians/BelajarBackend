import "@/styles/globals.css";
import Layout from "./layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
   const routes = useRouter();

   console.log(routes);
   return routes.route == "/" ? (
      <Component {...pageProps} />
   ) : (
      <Layout>
         <Component {...pageProps} />
      </Layout>
   );
}
