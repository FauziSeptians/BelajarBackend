const mongoose = require('mongoose');

const connectDB = async () => {
  try {
   const uri =
   "mongodb://fauzibelajar96:qCMBDrHhsRddHkVQ@ac-tu30cgj-shard-00-00.mfwcaof.mongodb.net:27017,ac-tu30cgj-shard-00-01.mfwcaof.mongodb.net:27017,ac-tu30cgj-shard-00-02.mfwcaof.mongodb.net:27017/?ssl=true&replicaSet=atlas-afa91k-shard-0&authSource=admin&retryWrites=true&w=majority";

    const connection = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;