const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const { User } = require('../models/user.model')
const _ = require("lodash")
const { response } = require('express')
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
});
//p1234567
//123Xyzasas
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWY3MjE0NTM0MTUzODMzMTA2MWQ4NzAiLCJ1c2VyTmFtZSI6InAxMjM0NTY3IiwiZW1haWwiOiJwMTIzNDU2N0BnbWFpbC5jb20iLCJpYXQiOjE1OTMyNTQyMTN9.cawQMIdl9S56nojL3MV3tVHKCzJdAaAfw6kEUTeFlow
router.post("/", async (req, res) => {

    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User already registered.");

        user = new User(_.pick(req.body, ['firstName', 'lastName', 'userName', 'email', 'password']))
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        console.log( user.password );
        await user.save();
        const token = user.generateAuthToken();
        res
            .header("x-auth-token", token)
            .send(_.pick(user, ["_id"], "firstName", "lastName", "email"));
    } catch (err) {
        console.dir(err);
        res.send('unable to create a user')
    }
});

router.get("/all", async (req, res) => {
    // res.send('Hello World')
    User.find()
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            winston.log(err.message || "Some error occurred while retrieving Users.");
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Users."
            });
        });
})

module.exports = router;