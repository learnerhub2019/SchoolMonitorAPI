const { DB_URL, DB_NAME } = require("./config");
const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      dbName: DB_NAME
    })
    .then(() => {
      console.log(`Database Connection established: ${DB_NAME}`);
    })
    .catch(err => {
      console.log("Unable to conect db");
      process.exit();
    });
};
