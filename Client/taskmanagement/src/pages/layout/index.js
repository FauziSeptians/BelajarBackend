import Sidebar from "../component/sidebar";

const Layout = ({ children }) => {
   return (
      <div className="flex w-screen h-screen bg-black">
         <Sidebar></Sidebar>
         <div className="w-full bg-[#f7f7f8] overflow-hidden p-[30px]">{children}</div>
      </div>
   );
};

export default Layout;
