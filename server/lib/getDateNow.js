function getDateNow(dates) {
   let Month = [
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
   let dateNow = dates.getDate();
   let MonthNow = dates.getMonth();
   let YearNow = dates.getFullYear();

   console.log(dateNow);
   console.log(YearNow);
   console.log(MonthNow);
   console.log(Month[MonthNow]);

   let tanggalSekarang = `${dateNow} ${Month[MonthNow]} ${YearNow}`;
   console.log(tanggalSekarang);
   return tanggalSekarang;
}

module.exports = getDateNow;
