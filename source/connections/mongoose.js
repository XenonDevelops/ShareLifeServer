var mongoose=require('mongoose');
mongoose.connect('mongodb://sharelifeuser:ShareLife@ds051534.mongolab.com:51534/sharelife');
module.exports=mongoose;