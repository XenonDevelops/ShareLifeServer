var mongoose = require('../connections/mongoose');
var Schema = mongoose.Schema;

var donatarioSchema = new Schema({
    id_usuario : {type: Schema.Types.ObjectId, ref: 'user'},
    organo_requerido : {type:String,required:true},
    status : {type:Boolean, required:true, default:true},
    date_registry : {type: Date, default: Date.now},
    have_recived_transplant : {type:Boolean, required:true, default:false},
    last_transplant : {type: Date}
});

var Donatario = mongoose.model('donatario', donatarioSchema);

module.exports = Donatario;