export function FormatCurrency(price) {

   const formattedPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR", // Kode mata uang untuk Rupiah
      currencyDisplay: "symbol", // Menampilkan simbol mata uang (Rp)
   }).format(price);

   return formattedPrice;
}
