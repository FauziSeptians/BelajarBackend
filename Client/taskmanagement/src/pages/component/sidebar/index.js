import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar({ repo }) {
   console.log(repo);
   const router = useRouter(null);
   const Nama = router.query.id;
   const [Menu, setMenu] = useState([]);

   useEffect(() => {
      const getDataMenu = async () => {
         const response = await axios.post("/api/validateUser", {
            Nama: Nama,
         });
         console.log(response);
         const Role = response.data.additionalData.Role;
         console.log(Role);
         const resp = await axios
            .post("/api/fiturSidebar", {
               Role: Role,
            })
            .catch((err) => {
               console.log(err);
            });
         console.log(resp.data);
         setMenu(resp.data.additionalData);
      };

      getDataMenu();
   }, []);

   console.log(Nama);

   console.log(router.query);
   return (
      <div className="h-full w-[300px] bg-[#8bcf1d] pt-[30px]">
         <div className="flex flex-col gap-3">
            {/* <div
               className="bg-[black] text-white font-semibold tracking-[1px] p-3 cursor-pointer"
               onClick={() => {
                  router.push({
                     pathname: "/pekerja",
                     query: { id: Nama },
                  });
               }}
            >
               Absensi
            </div>
            <div
               className="bg-[black] text-white font-semibold tracking-[1px] p-3 cursor-pointer"
               onClick={() => {
                  router.push({
                     pathname: "/taskmanagement",
                     query: { id: Nama },
                  });
               }}
            >
               Manajemen Tugas
            </div> */}
            {Menu.map((el) => {
               return (
                  <div
                     className="bg-[black] text-white font-semibold tracking-[1px] p-3 cursor-pointer"
                     onClick={() => {
                        router.push({
                           pathname: el.RoutePath,
                           query: { id: Nama },
                        });
                     }}
                  >
                     {el.NamaFitur}
                  </div>
               );
            })}
         </div>
      </div>
   );
}

// export async function getServerSideProps(context) {
//    const { query, req } = context;

//    console.log("test");

//    // const response = await axios.post("/api/validateUser", Data);
//    // const Role = response.data.additionalData.role;

//    const resp = await axios.post(
//       "http://localhost:3000/api/fiturSidebar",
//       "test"
//    );

//    console.log(resp);

//    let Data = {
//       Nama: query.id,
//       access_token: req.cookies.access_token,
//       SidebarData: resp.data.additionalData,
//    };

//    const Datas = {
//       test: "test",
//    };
//    console.log(Data);
//    return { props: { Datas } };
// }
