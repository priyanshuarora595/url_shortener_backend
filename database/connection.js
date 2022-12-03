const mongoose = require('mongoose');

exports.connectToDB = async () => {
    mongoose.connect(process.env.DB_URI,
    {
        useUnifiedTopology : true,
        useNewUrlParser : true
    }).then( ()=> {console.log("connected")} ).catch((err)=> { console.log("Error = ",err)})
}