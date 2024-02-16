const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const UserModel = require('../models/User');

const router = express.Router();

router.use(cookieParser());

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userByUsername = await UserModel.findOne({ username });
    const userEmail = await UserModel.findOne({ email });

    if (userByUsername) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    if (userEmail) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, email, password: hashPassword });
    await newUser.save();

    return res.json({ message: 'Record saved successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const {  email, password } = req.body;


    const userEmail = await UserModel.findOne({  email });

    if (!userEmail) {
      return res.status(400).json({ message: 'Invalid credentails.' });
    }


    const validPassword = await bcrypt.compare(password, userEmail.password);
    if (!validPassword) {

      return res.status(400).json({ message: 'Invalid credentials.' });
    }


    const token = jwt.sign({ id: userEmail._id },  "secret" );

    res.cookie('token', token ); 

    return res.json({ message: 'Successfully logged in', id: userEmail._id  });
     
        
  })
  
  router.get('/logout', async (req,res) => {
   await res.clearCookie("token")
   res.json({ message: 'Successfully logged out' });
  });
  



module.exports = router;
