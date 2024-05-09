var express = require("express");
var router = express.Router();
const checkMember = require("../middleware/checkMember.middleware");
var memberModel = require("../models/members.model");

router.put("/api/v1/approve/:id", async (req, res, next) => {
  if (req.cookies.adminCheck && req.cookies.adminCheck === "admin") {
    const userID = req.params.id;
    const newData = req.body;
    try {
      const updatedMember = await memberModel.findByIdAndUpdate(
        userID,
        newData,
        { new: true }
      );
      return res.status(200).send({
        msg: "Approve Success",
        show: updatedMember,
      });
    } catch (err) {
      return res.status(500).send({
        message: "Approve Fail",
        success: false,
      });
    }
  }
  return res.status(403).send({
    message: "You are not admin",
    success: false,
  });
});

module.exports = router;
