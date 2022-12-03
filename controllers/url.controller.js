const mongoose = require("mongoose");

const urlModel = require("../database/models/url_data").urlDataModel;

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
        redirection_url : req.redirection_url
    }

    return urlObj;
}


exports.getAllUrls = async(req,res) => {
    // console.log("hii all urls");
    try{

        const all_urls = await urlModel.find({});
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