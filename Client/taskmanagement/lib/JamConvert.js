export default function ConvertJam(jam) {
   console.log(jam);
   let splitedStr = jam.split(":");
   let newjam = null;
   let menit = splitedStr[1];

   if (splitedStr [0] >= 11 && splitedStr [0] < 15) {
      newjam = splitedStr [0] > 12 ? splitedStr [0] - 12 + ":" + menit + " Siang" : splitedStr [0] + ":" + menit + " Siang";
   }else if(splitedStr [0] >= 15 && splitedStr [0] <= 18){
    newjam = splitedStr [0] > 12 ? splitedStr [0] - 12 + ":" + menit + " Sore" : splitedStr [0] + ":" + menit + " Sore";
   }else if(splitedStr [0] > 18 && splitedStr [0] <= 24){
    newjam = splitedStr [0] > 12 ? splitedStr [0] - 12 + ":" + menit + " Malam" : splitedStr [0] + ":" + menit + " Malam";
   }else{
    newjam = splitedStr [0] > 12 ? splitedStr [0] - 12 + ":" + menit + " Pagi" : splitedStr [0] + ":" + menit + " Pagi";
   }

   return newjam;
}
