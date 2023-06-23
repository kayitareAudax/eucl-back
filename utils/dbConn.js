const mongoose=require("mongoose");
module.exports=mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(result=>{
    console.log(`connected to database`);
}).catch(err=>console.log(err));