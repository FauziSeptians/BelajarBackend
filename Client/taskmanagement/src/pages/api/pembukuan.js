const axios = require("axios");

export default async function handler(req, res) {
   console.log(req.body);

   const response = await axios.post(
      "http://localhost:5000/Pembukuan",
      req.body,
      {
         headers: {
            Authorization: `Bearer ${req.cookies.access_token}`,
         },
      }
   );

   res.status(200).send(response.data);
}
