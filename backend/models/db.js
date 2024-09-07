const mongoose = require('mongoose');


const mongo_url = process.env.MONGODB_CONNECTION;

mongoose.connect(mongo_url).then(()=>{
    console.log('MongoDb Connected...')
}).catch((err)=>{
    console.log('MongoDb Connection Error: ', err)
})