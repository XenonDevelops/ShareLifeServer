var mongoose = require('../connections/mongoose');
var Schema   = mongoose.Schema;

var userSchema=new Schema({
    email:{
        type :String,
        required: true
    },
    password : {type:String,required:true},
    name : {type:String, required:true},
    last_name : {type:String, required:true},
    birthdate : {type:Date},
    sex : {
        type:String,
        required:true,
        enum:[
            'female',
            'male'
        ]
    },
    type_user : {type:String, required:true, default:'user'},
    phone : {type:String},
    date_registry : {type: Date, required:true, default: Date.now},
    status : {type:Boolean, required:true, default:true},
    url_image : {type:String}
});

var User = mongoose.model('user',userSchema);

module.exports = User;