export default function HitungUmur(tahunLahir, bulanLahir, hariLahir) {
   let datenow = new Date();
   let tahun = datenow.getFullYear();
   let bulan = datenow.getMonth() + 1;
   let hari = datenow.getDate();
   if (tahun >= tahunLahir && bulan >= bulanLahir && hari >= hariLahir) {
      return tahun - tahunLahir;
   } else {
      return tahun - tahunLahir - 1;
   }
}
