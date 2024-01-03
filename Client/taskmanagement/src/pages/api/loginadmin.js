// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {
   const { Nama, Password } = req.body;

   let response = await axios.post("http://localhost:5000/loginadmin", {
      Nama: Nama,
      Password: Password,
   });

   res.status(200).send(response.data);
}
