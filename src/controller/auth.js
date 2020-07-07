const express = require("express");
const { User } = require("../models/user.model");
// const { buildSchemaFromTypeDefinitions } = require("apollo-server-express");
const router = express.Router();
const Joi = require("@hapi/joi");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid Email");

    // await bcrypt.compare(req.body.password, user.password);
    const validPassword = await user.comparePassword(req.body.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();

    res.send(token);
  } catch (err) {
    console.dir(err);
    res.status(400).send("Auth Failed " + err.message);
  }
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  });
  return schema.validate(req);
}

module.exports = router;
