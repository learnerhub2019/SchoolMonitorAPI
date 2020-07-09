const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
router.get("/", async (req, res) => {
  const saltRounds = 10;
  const myPlaintextPassword = req.body.password;
  const someOtherPlaintextPassword = "not_bacon";

  console.dir(req.body.password);
  // let hashPwd = "$2b$10$4JGwtmohsNVY92ZJYaRd3..SWjBxhUQcYQ5UvgN0GaLUu2WxAL6EW";
  // let hashPwd = "$2b$10$DWteep/jYRmVe97wyCQuMebuLe0QdKOKA7ga/IIE/eyhdyFMfzbra";
  try {
    let salt = await bcrypt.genSalt(saltRounds);
    let hashPwd = await bcrypt.hash(myPlaintextPassword, salt);

    console.log(hashPwd);

    const match = await bcrypt.compare(myPlaintextPassword, hashPwd);
    console.log(match);
  } catch (err) {
    console.dir(err);
  }
  res.send("School Api");
});

module.exports = router;
