import { IncomingForm } from "formidable";
import axios from "axios";

export const config = {
   api: {
      bodyParser: false,
   },
};

export default async (req, res) => {
   console.log(req);
   console.log(req.body);

   const form = new IncomingForm();
   //    var Nama = null;
   //    var Password = null;
   //    var imageData = null;
   const fd = new FormData();

   form.parse(req, async (err, fields, files) => {
      if (err) return reject(err);
      console.log(fields, files);
      console.log(files.file);

      fd.append("Nama", fields.Nama);
      fd.append("Password", fields.Password);
      fd.append("imageData", files.file);
      console.log(fd.get("imageData"));

      console.lo;

      const response = await axios
         .post("http://localhost:5000/AbsenMasuk", fd, {
            headers: {
               Authorization: `Bearer ${req.cookies.access_token}`,
               "Content-Type": "multipart/form-data",
            },
         })
         .catch((err) => {
            console.log(err);
         });

      console.log(response.data);
   });
};
