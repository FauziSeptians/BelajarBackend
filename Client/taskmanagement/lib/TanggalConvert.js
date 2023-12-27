export default function ConvertTanggal(tanggal) {
   let date = new Date(tanggal);
   let bulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
   ];
   let day = date.getDate();
   let month = bulan[date.getMonth()];
   let year = date.getFullYear();

   return `${day} ${month} ${year}`;
}
