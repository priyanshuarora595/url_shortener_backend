const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const ObjectId = mongoose.SchemaTypes.ObjectId;


const sessionSchema = new Schema({
    session_id : {type:String},
    user_id : {type:String},
    // user_id : {type:ObjectId},
    status:{type:String, enum :["active","inactive","deleted"]},
},
{
    timestamps:true
});

const sessionModel = new model("sessions",sessionSchema);
module.exports = sessionModel;