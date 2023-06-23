const { validationResult } = require('express-validator');
const PurchasedTokens = require('../models/Token');

generateTokenValue = (amount) => {
    try {
        const minAmount = 100;
        const maxDays = 1825; // 5 years in days
        const maxAmount = maxDays * minAmount;
        const days = Math.floor(amount / minAmount);
        const timestamp = Date.now();
        const uniqueFactor = Math.floor(Math.random() * 1000) % 100; // Additional unique factor limited to 2 digits
        const token = `${timestamp}${uniqueFactor}`.slice(-6) + days.toString().padStart(2, '0');
        const truncatedToken = token.slice(0, 8); // Truncate the token to maximum length of 8 characters
        return {
            token: truncatedToken,
            days
        };
    } catch (err) {
        console.log(err);
    }
};
// Controller function to generate a token
const generateToken = async (req, res) => {
    const { amount, meterNumber } = req.body;
    console.log(req.body);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.json({success:false,message:errors.array()[0].msg});
    }
    // Calculate the number of days the token will last based on the given amount
    const minAmount = 100;
    const maxDays = 1825; // 5 years in days
    const maxAmount = maxDays * minAmount;
    if(amount<minAmount){
        return res.json({success:false,message:"Please enter amount greater than 100RWF"})
    }
    if(amount>maxAmount){
        return res.json({success:false,message:"Please enter amount greater than 100RWF"})
    }
    if(amount%100!=0){
        return res.json({success:false,message:"amount should be a multiple of 100"})
    }
    const { token, days } = generateTokenValue(amount);    //check if token exceeds five years
    if (days > 1825) {
        return res.json({ success: false, message: "Please create token less than 5 Years" })
    }
    // Create a new PurchasedTokens instance
    const purchasedToken = new PurchasedTokens({
        meterNumber,
        token_status: 'NEW',
        token,
        token_value_days: days,
        amount: amount
    });

    try {
        // Save the token to the database
        const savedToken = await purchasedToken.save();
        res.status(200).json({ success: true, token: savedToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Token generation failed' });
    }
};
const getTokensByMeter = async (req, res, next) => {
    const { meterNumber } = req.body;
    console.log(req.body);
    const tokens = await PurchasedTokens.find({ meterNumber });
    return res.json({ success: true, message: "Tokens generated", data: tokens });
}
const validateToken = async (req, res, next) => {
    const { token } = req.body;
    const tokenObj = await PurchasedTokens.findOne({token:token});
    if (!tokenObj) {
        return res.json({ success: false, message: "token does not exists" });
    }
    //return number of days
    return res.json({ success: true, message: "Token object", data: tokenObj.token_value_days,purchased:tokenObj.purchasedDate })
}
module.exports = { generateToken, getTokensByMeter, validateToken };
