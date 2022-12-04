const jwt  = require("jsonwebtoken");

exports.verifyTokenMiddleware = (req,res,next) => {
    try{
        let token = req.headers.authorization;
        console.log(token);
        if(token){
            token = token.split(" ")[1];
            let user = jwt.verify(token,process.env.SECRET_KEY);
            console.log("===========user==============",user);
            if(user){
                req.userId = user.userId;
            }
            else{
                res.status(401).send({
                    status : 401,
                    error : true,
                    message : "unauthorized user , Invalid token"
                })
            }
        }else{
            res.status(401).send({
                status : 401,
                error : true,
                message : "unauthorized user"
            })
        }

    }
    catch(err)
    {
        res.status(400).send({status : 400,error:true,message : err.message});
    }

    next();
}