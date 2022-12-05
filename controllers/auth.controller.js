const userModel = require("../database/models/user").userModel;


const crypto = require("crypto");
const salt = process.env.SALT;

const jwt = require("jsonwebtoken");


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

function createUserObject(req){
    const userObj = {
        username : req.username,
        fullName : req.fullName,
        email : req.email,
        mobile_number : req.mobile_number,
        password : req.password,
        gender : req.gender,
        address : req.address,
        dob : req.dob
    }
    return userObj;
}



exports.login = async (req,res) => {
    
    try{
        const userData = req.body;
        // console.log(userData);
        const userObj = await userModel.findOne({email:userData.email});
        if(userObj){
            // console.log(userObj);
            const pass = String(userData.password).concat(salt);
            const hash = crypto.createHash(process.env.ENCODING_ALGO)
            hash.update(pass);
            const hashPassword = hash.digest(process.env.DIGEST_ENCODING);
            // console.log(hashPassword);
            // console.log(userObj.password)
            if(hashPassword==userObj.password)
            {
                let  token = jwt.sign({
                    userId: userObj._id,
                    username : userData.username,
                    email:userData.username,
                },process.env.SECRET_KEY);

                // res.cookie("jwt",token);
                // res.headers.append({"authorization":"Bearer "+token});
                // res.setHeader("authorization","Bearer "+token);
                res.send(responseData(200,"user login success",false,userObj,{token}));
            }
            else{
                res.send(responseData(400,"incorrect password !",true,))
            }
        }
        else{
            res.send(responseData(400,"No Such user Exists. Either Check email address or signup!",false,userData));
        }
    }
    catch(err){
        console.log(err.message);
        res.send(responseData(400,err.message,true,"unable to login"));
    }
}

exports.signup = async (req,res) => {
    // console.log("hiii signup");
    // console.log(req.method);
    try{
        const userData = req.body;
        // console.log(userData);
        const userExist = await userModel.findOne({email:userData.email});
        
        if(userExist){
            res.status(200).send(responseData(400,"user already exists ! Please login",false,userExist))
        }
        else{

            const pass = String(userData.password).concat(salt);
            const hash = crypto.createHash(process.env.ENCODING_ALGO)
            hash.update(pass);
            const hashPassword = hash.digest(process.env.DIGEST_ENCODING);
            userData.password = hashPassword;
            const newUser = await userModel.create(createUserObject(userData));
            //jwt has 3 parts 1. header 2. payload 3. signature
            let  token = jwt.sign({
                userId: newUser._id,
                username : userData.username,
                email:userData.username,
            },process.env.SECRET_KEY);

            // res.cookie("jwt",token);
            // res.headers.append({"authorization":"Bearer "+token});
            // res.setHeader("authorization","Bearer "+token);
            res.send(responseData(200,"user signup success",false,newUser,{token}));
        }
        }
        catch(err){
        res.send(responseData(400,err.message,true,"unable to signup"));
    }
}



exports.logout = async (req,res) => {
    try{
        res.clearCookie("jwt");
        res.send(responseData(200,"user logout success",false));
    }
    catch(err){
        res.send(responseData(400,err.message,true,"unable to logout"));
    }
}