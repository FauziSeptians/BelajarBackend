// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const response = await axios.post("/api/UpdatePulang", {
   Nama: Nama,
   Password: Password,
   Keterangan: Description,
});
