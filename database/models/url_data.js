const mongoose = require("mongoose");

const {Schema , model} = mongoose;

const urlData = new Schema({
    url_string : {
        type:String,
        required:true
    },
    redirection_url : {
        type: String,
        required:true
    }
});

exports.urlDataModel = new model("url_data",urlData);