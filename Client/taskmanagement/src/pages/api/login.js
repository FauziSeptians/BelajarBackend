// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {
   const { Nama, Password } = req.body;

   let response = await axios.post("http://localhost:5000/login", {
      Nama: Nama,
      Password: Password,
   });

   console.log(response.data);

   res.status(200).send(response.data);
}
