import axios from "axios";

export default async function handler(req, res, next) {
   console.log(req);
   console.log(req.cookies.access_token);
   const response = await axios.post(
      "http://localhost:5000/summarypembukuan",
      req.body,
      {
         headers: {
            Authorization: `Bearer ${req.cookies.access_token}`,
         },
      }
   );

   console.log(response.data);

   res.status(200).send(response.data);
}
