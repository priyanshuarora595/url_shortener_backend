const mongoose = require("mongoose");
const  ObjectId = mongoose.SchemaTypes.ObjectId ;
const {Schema , model} = mongoose;

const urlData = new Schema({
    url_string : {
        type:String,
        required:true
    },
    redirection_url : {
        type: String,
        required:true
    },

    owner_user : {
        type : ObjectId
    }
});

exports.urlDataModel = new model("url_data",urlData);
exports.urlSchema = urlData;