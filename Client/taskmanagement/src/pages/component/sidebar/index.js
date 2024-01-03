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
      <div className="h-full w-[300px] bg-[#8bcf1d] pt-[30px] flex flex-col justify-between">
         <div className="flex flex-col gap-3">
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
         <div className="p-4 flex justify-evenly items-center">
            <div>
               <img src="/assets/gmail.png" width={24}></img>
            </div>
            <div>
               <img src="/assets/youtube.png" width={24}></img>
            </div>
            <div>
               <img src="/assets/youtube.png" width={24}></img>
            </div>
         </div>
      </div>
   );
}
