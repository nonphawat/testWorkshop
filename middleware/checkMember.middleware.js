const { default: mongoose } = require("mongoose");
var memberModel = require("../models/members.model");
const productModel = require('../models/products.model')
const bcrypt = require('bcrypt')


const checkMember = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const member = await memberModel.findOne({
      username: username,
    });
    if (!member) {
      return res.status(500).send({
        message: "login fail",
        success: false,
      });
    }
 

    const checkPassword = await bcrypt.compare(password, member.password);
    if (!checkPassword) {
      return res.status(500).send({
        message: "login fail",
        success: false,
      });
    }
    if(member.username === "admin"){
      req.admin = true;
      console.log("asd");
    }
    //``

    next();
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

const checkProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const findProduct = productModel.findById(id);
    //!mongoose.Types.ObjectId.isValid(id)
    if (!findProduct) {
      return res.status(400).send({
        msg: "id Invalid",
        success: false,
        err: ["id is not a objectID"],
      });
    }
    //const product = await productModel.findById(id);
    next();
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

module.exports = { checkMember, checkProduct };
