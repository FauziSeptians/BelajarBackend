// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
export default async function handler(req, res) {
   console.log(req.body);
   const { Nama } = req.body;

   console.log(req.cookies.access_token);

   console.log(Nama);
   const response = await axios
      .post(
         "http://localhost:5000/validateUser",
         {
            Nama: Nama,
            Token: req.cookies.access_token,
         },
         {
            headers: {
               Authorization: `Bearer ${req.cookies.access_token}`,
            },
         }
      )
      .catch((err) => {
         res.status(200).send(err.message);
      });

   console.log(response.data);

   res.status(200).send(response.data);
}
