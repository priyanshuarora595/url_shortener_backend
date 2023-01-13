const Token = require("../database/models/token");

exports.CheckToken = async(req,res) =>{
    const token = req.body.token;

    const tokenExist = await Token.findOne({"token":token});
    if(tokenExist) return res.status(200).send({"message":true});
    return res.status(400).send({"message":false});
}