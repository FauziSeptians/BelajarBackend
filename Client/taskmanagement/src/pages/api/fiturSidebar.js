// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");
export default async function handler(req, res) {
   console.log(req.body);
   const { Role } = req.body;

   const response = await axios.post(
      "http://localhost:5000/getsidebarfitur",
      {
         Role: Role,
      },
      {
         headers: {
            Authorization: `Bearer ${req.cookies.access_token}`,
         },
      }
   );

   console.log(response.data);

   res.status(200).send(response.data);
}
