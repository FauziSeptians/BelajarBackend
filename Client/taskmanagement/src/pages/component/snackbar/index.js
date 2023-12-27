const Snackbar = ({ message }) => {
   return (
      <div
         className={`z-[100000] fixed top-[3%] left-[45%] text-white ${
            message && message.includes("Success")
               ? "bg-green-500"
               : "bg-red-500"
         } py-3 px-2 rounded-md tracking-[0.5px]`}
      >
         {message}
      </div>
   );
};

export default Snackbar;
