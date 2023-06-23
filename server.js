const express=require("express");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const app=express();
const port=process.env.PORT ||5000;
const cors=require("cors");
const dotenv=require("dotenv");
dotenv.config();
const connectDb=require("./utils/dbConn");
app.use(cors())
app.listen(port,()=>{
    console.log("app listening on port 5000")
})
app.use(express.json());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
//routes;
const routes=require("./routes");
app.use("/",routes);