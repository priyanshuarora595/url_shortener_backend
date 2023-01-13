const userModel = require("../database/models/user").userModel;
const Token = require("../database/models/token");

const sendEmail = require("../middleware/sendEmail");
const crypto = require("crypto");

exports.ResetPasswordLink = async(req,res) => {}



exports.ResetPassword = async(req,res) =>{
    try{

        const userData = req.body;
        const user  = await userModel.findOne({email : userData.email});
        if(!user) return res.status(400).send("no such user found!");
        
        let token = await Token.findOne({userId : userData._id});
        
        if(!token){
            token = await new Token({
                userId : userData._id,
                token : crypto.randomBytes(32).toString("hex")
            }).save();
        }
        
        const link = `${process.env.BASE_URL}password-reset/${userData._id}/${token.token}`;
        const result = await sendEmail(userData.email,"password reset link",link);
        if(result==true)        res.status(200).send({"message":"password reset link sent successfully","email":userData.email,"link":link});
        else res.status(400).send({"message":"password reset link not sent ","email":userData.email,"error":result});
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }

}
