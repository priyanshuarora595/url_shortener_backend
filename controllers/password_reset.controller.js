const userModel = require("../database/models/user").userModel;
const Token = require("../database/models/token");

const sendEmail = require("../middleware/sendEmail");
const crypto = require("crypto");

function responseData(status,message,error,data){
    const obj = {
        "status" : status,
        "message" : message,
        "error" : error,
        "data" : data
    }
    return obj;
}

exports.ResetPasswordLink = async(req,res) => {
    try{

        const data = req.body;
        console.log(data);

    const user = await userModel.findOne({"_id" : data.userId});
    if(!user) return res.status(400).send(responseData(400,"user not found",true,data));

    const pass = String(data.pass1).concat(process.env.SALT);
            const hash = crypto.createHash(process.env.ENCODING_ALGO)
            hash.update(pass);
            const hashPassword = hash.digest(process.env.DIGEST_ENCODING);
            user.password = hashPassword;
            const updatedUser = await user.save();

            await Token.deleteOne({"token":data.token});
            return res.status(200).send(responseData(200,"Password Changed Successfully!",false,updatedUser));
        }
        catch(err){
            return res.status(400).send(responseData(400,"Caught an Error!",true,err));
        }
}



exports.ResetPassword = async(req,res) =>{
    try{

        const userData = req.body;
        const user  = await userModel.findOne({email : userData.email});
        if(!user) return res.status(400).send({"status":400,"error":"no such user found!"});
        
        let token = await Token.findOne({userId : user._id});
        
        if(!token){
            token = await new Token({
                userId : user._id,
                token : crypto.randomBytes(32).toString("hex")
            }).save();
        }
        
        const link = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}`;
        const result = await sendEmail(userData.email,"password reset link",link);
        if(result==true)        res.status(200).send({"status":200,"message":"password reset link sent successfully","email":userData.email,"link":link});
        else res.status(400).send({"status":400,"message":"password reset link not sent ","email":userData.email,"error":result});
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }

}
