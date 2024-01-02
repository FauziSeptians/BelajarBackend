import Typed from "react-typed";

const Greetings = ({ Username, Modals }) => {
   let dates = new Date();
   let Jam = dates.getHours();
   let Menit = dates.getMinutes();
   return (
      <>
         <div className="flex  justify-between items-center">
            <div className="Greetings text-[20px]">
               <div className="text-[28px] font-semibold tracking-[2px]">
                  Hi,{" "}
                  <span className="text-[24px] font-light tracking-[1px]">
                     {Username}
                  </span>
               </div>
               <div className="font-light text-[#000000ac]">
                  <Typed
                     strings={[
                        "Halo! Semoga harimu menyenangkan!",
                        "Hello! Have a great day!",
                        "¡Hola! ¡Que tengas un día estupendo!",
                        "Bonjour ! Passez une excellente journée !",
                        "Hallo! Hab einen tollen Tag!",
                        "Ciao! Buona giornata!",
                        "Привет! Хорошего дня!",
                        "你好！祝你拥有美好的一天！",
                        "こんにちは！素晴らしい一日を！",
                        "안녕하세요! 즐거운 하루 되세요!",
                        "مرحبا! أتمنى لك يومًا رائعًا!",
                        "नमस्ते! आपका दिन शानदार हो!",
                        "Habari! Uwe na siku njema!",
                     ]}
                     style={{ fontFamily: "Poppins" }}
                     typeSpeed={150}
                     backSpeed={100}
                     loop
                  />
               </div>
            </div>
            <div className="flex gap-7 text-[18px]  items-center">
               <div className="tracking-[1px] ">
                  {Jam} : {Menit}
               </div>
               <div
                  onClick={() =>
                     Modals({
                        type: "Logout",
                        Nama: Username,
                     })
                  }
                  className=" text-[#8bcf1d] font-semibold tracking-[0.5px] cursor-pointer"
               >
                  Logout
               </div>
            </div>
         </div>
      </>
   );
};

export default Greetings;
