const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')// we will use express validators to validate the json payload that is going towards the server.
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = "thisismySecret"
const fetchuser = require('../middleware/fetchuser')

// ROUTE 1 : Create a User using: POST "/api/auth/createUser". No login required.

router.post('/createUser', [
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 3 })
], async (req, res) => {

    try {
        //we are checking for valiations, if there are errors we are returning Bad request and the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //checking if the email is unique or not.
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        //Hashing the password.
        const salt = await bcrypt.genSalt(10)
        const securePass = await bcrypt.hash(req.body.password, salt)

        //creating a new user.
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass
        })

        //sending a sample response.
        // res.json(user)

        //sending auth token
        const authToken = jwt.sign({     //
            id: user.id
        }, secret)

        res.json({ authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

//ROUTE 2 : Creating a login endpoint using router.post : No login required.

router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body

        //finding user through database

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Please Login with correct credentials" })
        }

        //Comparing the password.

        const passwordCompare = await bcrypt.compare(password, user.password)

        //If password is wrong.

        if (!passwordCompare) {
            return res.status(400).json({ error: "Please Login with correct credentials" })
        }

        //finally when everything is correct.

        const data = {
            user: {
                id : user.id
            }
        }

        const authToken = jwt.sign(data, secret)
        res.json({ authToken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error occured")
    }
})

//ROUTE 3 : getting details of the user using POST 'api/auth/getUser' Login required.(auth-token needed)

router.post('/getUser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password") //findBy or find is a Schema method 
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router