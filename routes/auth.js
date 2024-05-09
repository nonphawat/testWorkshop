var express = require("express");
var router = express.Router();
const {checkMember} = require("../middleware/checkMember.middleware");
var memberModel = require("../models/members.model");
var bcrypt = require('bcrypt')

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// router.post('/api/v1/login',checkMember, async(req, res)=>{
//   try{
//     const { finduserindex } = req;
//     console.log(finduserindex);
//     let members = await memberModel.find();

//     return res.status(200).send(`${members[finduserindex].username} waiting admin approve!`);

//   }catch(err){

//     res.status(500).send(err.toString());

//   }
// })

router.post("/api/v1/login", checkMember, async (req, res, next) => {
  try {
   
    const { admin } = req
    
    if(admin === true){
      console.log("THis");
      res.cookie('adminCheck', 'admin', { maxAge: 60000 * 5 })
    }
    //``
    return res.status(200).send({
      success: true,
      message: "Login Success"
    });

  } catch (err) {
    return res.status(500).send({
      message: "login fail",
      success: false,
    });
  }
});

router.post("/api/v1/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    //console.log("show this ", username);
    const hashPassword = await bcrypt.hash(password, 10);

    let newMember = new memberModel({
      username,
      password: hashPassword,
      approve: false,
    });
    let member = await newMember.save();
    return res.status(201).send({
      username: member.username,
      message: "member created success",
      approve: false,
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

module.exports = router;
