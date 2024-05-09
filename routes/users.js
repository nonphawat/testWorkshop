var express = require('express');
var router = express.Router();
var memberSchema = require('../models/members.model')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/auth/v1/login', async(req, res)=>{
  try{
    const { username, password } = req.body;

    

    //if(!findUser) 
    return res.status(201).send('')

  }catch(err){

    res.status(500).send(err.toString());

  }
})

module.exports = router;
