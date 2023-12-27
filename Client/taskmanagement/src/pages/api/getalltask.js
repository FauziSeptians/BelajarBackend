// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
export default async function handler(req, res) {
   const { Nama, Token } = req.body;

   const obj = {
      Nama: Nama,
   };
   console.log(req.cookies.access_token);
   const result = await axios.post("http://localhost:5000/getAllData", obj, {
      headers: {
         Authorization: `Bearer ${Token}`,
      },
   });

   console.log(result);
   console.log(result.data);
   res.status(200).send(result.data);

}
