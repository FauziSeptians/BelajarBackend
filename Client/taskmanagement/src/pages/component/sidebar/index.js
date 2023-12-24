const Sidebar = () => {
   return (
      <div className="h-full w-[300px] bg-[#8bcf1d] pt-[30px]">
         <div className="flex flex-col gap-3">
            <div className="bg-[black] text-white font-semibold tracking-[1px] p-3 cursor-pointer">
               Absensi
            </div>
            <div className="bg-[black] text-white font-semibold tracking-[1px] p-3 cursor-pointer">
               Manajemen Tugas
            </div>
            <div className="bg-[black] text-white font-semibold tracking-[1px] p-3 cursor-pointer">
               Absensi
            </div>
         </div>
      </div>
   );
};

export default Sidebar;
