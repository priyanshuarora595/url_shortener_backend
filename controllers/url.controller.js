const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId ;
const urlModel = require("../database/models/url_data").urlDataModel;
const userModel = require("../database/models/user").userModel;


function responseData(status,message,error,data,extra){
    const obj = {
        "status" : status,
        "message" : message,
        "error" : error,
        "data" : data,
        "extra" : extra
    }
    return obj;
}

function createUrlObject(req){
    const urlObj = {
        url_string : req.url_string,
        redirection_url : req.redirection_url,
        owner_user : req.owner_user
    }

    return urlObj;
}

const insertUrlInUserData = async(req,url_id) => {
    const reqData = req.body;
    console.log("=======url_id===========",url_id);
    console.log(reqData)
    url_id = String(url_id);
    const updateUserUrl = await userModel.updateOne({"_id":reqData.owner_user},{ $push: { associated_url: url_id } })
    console.log(updateUserUrl);
}


exports.getAllUrls = async(req,res) => {
    // console.log("hii all urls");
    try{

        const all_urls = await urlModel.find({});
        console.log(all_urls)
        res.status(200).send(responseData(200,"all the urls with redirections",false,all_urls));
    }catch(err)
    {
        res.status(400).send(responseData(400,err.message,true,all_urls));
    }
}


exports.createNewRedirection = async (req,res) => {
    // console.log("inside create new redirection");
    try{
        const urlData = req.body;
        // console.log(userData);
        const urlExist = await urlModel.findOne({url_string:urlData.url_string});
        
        
        if(urlExist){
            res.status(200).send(responseData(200,"this url string already exists ! Please try some other string combination",true,urlExist))
        }
        else{
            const url_obj = await urlModel.create(createUrlObject(urlData));
            console.log(url_obj._id);
            insertUrlInUserData(req,url_obj._id);
            res.status(200).send(responseData(200,"new redirection created successfully!",false,url_obj));
        }
        }
        catch(err){
        res.send(responseData(400,err.message,true,"unable to create redirection"));
    }
}

exports.redirect = async (req,res) => {
    
    try{
        let url_Str = String(req.url).slice(1,);
        // console.log(url_Str);
        const urlExists = await urlModel.findOne({url_string:url_Str});
        if(urlExists){
            res.status(200).send(responseData(200,"redirection url found",false,urlExists));
        }
        else{
            res.status(400).send(responseData(400,"url string does not exists",true,urlExists));
        }
    }catch(err){
        res.status(400).send(responseData(400,err.message,true));
    }
}


exports.getUserUrls = async(req,res) => {
    // console.log("hii all urls");
    const reqData = req.body;
    // console.log(reqData);
    try{
        // var all_urls = await userModel.findOne({"_id":new ObjectId(reqData.uid)});
        var all_urls = await urlModel.find({"owner_user":new ObjectId(reqData.uid)})
        // console.log(all_urls);
        
        
        // console.log(all_urls)
        res.status(200).send(responseData(200,"all the urls with redirections",false,all_urls));
    }catch(err)
    {
        res.status(400).send(responseData(400,err.message,true,all_urls));
    }
}


exports.deleteUrl = async (req,res) => {
    const reqData = req.body.item;
    console.log(reqData);
    try{
        const user_obj = await userModel.updateOne({"_id":ObjectId(reqData.owner_user)}, { $pull: { associated_url: ObjectId(reqData._id) } });
        console.log("user ubject update = ===============================================",user_obj);
        const url_obj = await urlModel.deleteOne({"_id" : ObjectId(reqData._id)})
        // console.log("url ubject update = ===============================================",url_obj);
        res.status(200).send(responseData(200,"deletion successful!",false,user_obj));
    }catch(err){

        res.status(400).send(responseData(400,err.message,true));
    }
}