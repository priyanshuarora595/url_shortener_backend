const userModel = require("../database/models/user").userModel;


function responseData(status,message,error,data){
    const obj = {
        "status" : status,
        "message" : message,
        "error" : error,
        "data" : data
    }
    return obj;
}


exports.getUserDetails = async (req,res) => {
    try{
        // const user = await userModel.find();
        // console.log(user);
        res.status(200).send({"ststusCode":200,"message":"Hello to the url shortener api","error":false});
    }

    catch(err){
        console.log(err);
        res.status(200).send({"ststusCode":200,"message":err.message,"error":ture,"data":null});
    }
}


exports.setUserDetails = async (req,res) => {
    try{
        // console.log(req);
        // const userData = req.body;
        // console.log(userData);
        // const newUser = await createUserObj(req);
        // const savedUser = await User.create(newUser);
        return res.status(200).send({"message":"User created successfully"})
    }
    catch(err){
        return res.status(400).send({error:"Unable to create the user",error:err});
    }
}



