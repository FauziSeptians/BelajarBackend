import { useRouter } from "next/router";

const Sidebar = ({ Data }) => {
   console.log(Data);
   const router = useRouter(null);
   const Nama = router.query.id;

   console.log(Nama);

   console.log(router.query);
   return (
      <div className="h-full w-[300px] bg-[#8bcf1d] pt-[30px]">
         <div className="flex flex-col gap-3">
            <div
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
            </div>
         </div>
      </div>
   );
};

export default Sidebar;

export async function getServerSideProps(context) {
   const { query, req } = context;

   console.log("testtt");
   console.log(query);

   let Data = {
      Nama: query.id,
      access_token: req.cookies.access_token,
   };

   console.log(Data);
   return { props: { Data } };
}
