const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
   AccessToken: {
      type: "string",
   },
});

const TokenModel = new mongoose.model("TokenJWT", TokenSchema);
module.exports = TokenModel;
