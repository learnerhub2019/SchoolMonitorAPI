const dotenv = require("dotenv");

dotenv.config();
const { PORT, DB_URL, DB_NAME, SECRET_KEY, REQUIRE_AUTH } = process.env;
module.exports = { PORT, DB_URL, DB_NAME, SECRET_KEY, REQUIRE_AUTH };
