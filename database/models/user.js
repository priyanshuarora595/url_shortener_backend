const mongoose = require("mongoose")
const {Schema , model} = mongoose;
const  ObjectId = mongoose.SchemaTypes.ObjectId ;



const userAddressSchema = new Schema({
    address_line_1 : String,
    address_line_2 : String,
    city : String,
    postal_code : String,
    country : String,
    contact_number : Number,
});


const userSchema = new Schema(
    {
        username : {
            type:String,
            required: true,
        },
        fullName : {
            type : String,
            required : true,
            trim : true,
            default : 'GuestUser'
        },

        email : {
            type: String
            // required : true,
        },

        mobile_number : {
            type: Number,
        },

        password : {
            type : String,
        },

        gender : {
            type : String,
            enum : ["Male","Female","Others"]
        },

        address : {
            type : userAddressSchema,
        },

        dob : {
            type : String,
        },

        associated_url :[String],

        is_admin : { 
            type:Boolean,
            default:false
        }
    }
    ,
    {
        timestamps : true
    }
);


exports.userModel = new model("users",userSchema);
