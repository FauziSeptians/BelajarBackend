export default function ConvertJam(jam) {
   console.log(jam);
   let splitedStr = jam.split(":");
   let newjam = null;
   let menit = splitedStr[1];

   console.log(typeof menit);
   console.log(splitedStr[0]);
   console.log(typeof splitedStr[0]);
   console.log(parseInt(splitedStr[0]) > 12);

   if (splitedStr[0] >= 11 && splitedStr[0] < 15) {
      newjam =
         parseInt(splitedStr[0]) > 12
            ? "0" + splitedStr[0] - 12 + ":" + menit + " Siang"
            : splitedStr[0] + ":" + menit + " Siang";
   } else if (splitedStr[0] >= 15 && splitedStr[0] <= 18) {
      newjam =
         parseInt(splitedStr[0]) > 12
            ? "0" + parseInt(splitedStr[0]) - 12 + ":" + menit + " Sore"
            : splitedStr[0] + ":" + menit + " Sore";
   } else if (splitedStr[0] > 18 && splitedStr[0] <= 24) {
      newjam =
         parseInt(splitedStr[0]) > 12
            ? "0" + splitedStr[0] - 12 + ":" + menit + " Malam"
            : splitedStr[0] + ":" + menit + " Malam";
   } else {
      newjam =
         splitedStr[0] < 10
            ? "0" + splitedStr[0] + ":" + menit + " Pagi"
            : splitedStr[0] + ":" + menit + " Pagi";
   }

   console.log(newjam);

   return newjam;
}
