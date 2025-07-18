const { configDotenv } = require('dotenv')
const mongoose = require('mongoose')
configDotenv()

function dbConnection(){
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("connnected to MongoDB")
    })
    .catch(err =>{ console.log(err)})

}

module.exports = dbConnection;