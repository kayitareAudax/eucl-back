const router=require("express").Router();
router.use("/token",require("./token.routes"))
module.exports=router;