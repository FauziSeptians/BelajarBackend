// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
export default async function handler(req, res) {
   const { Nama, Keterangan, Password } = req.body;
   console.log(req.body);
   const response = await axios
      .post(
         "http://localhost:5000/UpdatePulang",
         {
            Nama: Nama,
            Keterangan: Keterangan,
            Password: Password,
         },
         {
            headers: {
               Authorization: `Bearer ${req.cookies.access_token}`,
            },
         }
      )
      .catch((err) => {
         console.log(err.message);
      });

   console.log(response);

   res.status(200).send(response.data);
}
