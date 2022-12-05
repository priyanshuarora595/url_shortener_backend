jwt = require("jsonwebtoken")

const userObj = { 
    "_id" : "638c5430572a2fd78a5dbb94",
    username : "lucifer",
    email : "arorapriyanshu22@gmail.com"

}

let  token = jwt.sign({
    userId: userObj._id,
    username : "lucifer",
    email : "arorapriyanshu22@gmail.com"
},"173a53a7a3c8d5653a38912ac560a4e68ae8ddcabda6e702cf0829bf48c8a246");

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzhjNTQzMDU3MmEyZmQ3OGE1ZGJiOTQiLCJpYXQiOjE2NzAyNDYzNzd9.j9RmyCNjttWHufBgdl6hmE31n8aqB9UBDcMPAOdV28U"

console.log("token ==== ",token);

const decoded = jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzhkZWI0MjU0NWE3NDQzZDAwMGFhY2MiLCJ1c2VybmFtZSI6IlByaXlhbnNodUFyb3JhIiwiZW1haWwiOiJQcml5YW5zaHVBcm9yYSIsImlhdCI6MTY3MDI0NTE4N30.JHSGGX37iQjDhxhyrpXgorP7iHKhMUfFHTOiFDPYPeI");
const verify = jwt.verify(token,"173a53a7a3c8d5653a38912ac560a4e68ae8ddcabda6e702cf0829bf48c8a246")

console.log("decoded ======",decoded);
console.log("verify ======",verify);

