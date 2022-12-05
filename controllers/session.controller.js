const sessionModel = require("../database/models/session");

function responseData(status,message,error,data){
    const obj = {
        "status" : status,
        "message" : message,
        "error" : error,
        "data" : data
    }
    return obj;
}

function createSessionObject(req){
    const orderObj = {
        session_id : req.session_id,
        user_id : req.user_id,
        // user_id : {type:ObjectId},
        status: req.status
    }
    return orderObj;
}


exports.getAllSessions = async(req,res) => {
    try{
        const sessions = await sessionModel.find();
        res.status(200).send(responseData(200,"all the sessions ",false,sessions)); 

    }
    catch(err){
        res.status(400).send(responseData(400,err.message,true));
    }
}

exports.createSession = async(req,res) =>{
    try{
        const session = await sessionModel.create(createSessionObject(req.body));
        res.status(200).send(responseData(200,"session created successfully!",false,session));

    }
    catch(err)
    {
        res.status(400).send(responseData(400,err.message,true));
    }
}