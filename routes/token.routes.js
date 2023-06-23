const { check } = require("express-validator");
const { getTokensByMeter, generateToken, validateToken } = require("../controllers/tokens.controller");

const router=require("express").Router();
router.route("/generate").post(
    check("amount","Please enter amount of value greater than 100").isNumeric().isLength({min:1}),
    check("meterNumber").exists().isNumeric().withMessage("please enter meter number of 6 digits").isLength({min:6,max:6}).withMessage("please enter meter number of 8 digits"),
    generateToken);
router.route("/getTokensByMeter").post(getTokensByMeter);
router.route("/validate").post(validateToken)
module.exports=router