// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");
export default async function handler(req, res) {
   try {
      const response = await axios.post(
         "http://localhost:5000/getDatapembukuan",
         {
            headers: {
               Authorization: `Bearer ${req.cookies.access_token}`,
            },
         }
      );

      res.status(200).send(response.data);
   } catch (error) {
      res.status(200).send(response.data);
   }
}
