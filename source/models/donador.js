var mongoose = require('../connections/mongoose');
var Schema   = mongoose.Schema;

var donadorSchema = new Schema({
    id_usuario : {type: Schema.Types.ObjectId, ref: 'user'},
    status : {type:Boolean, required:true, default:true},
    date_registry : {type: Date, default: Date.now},
    have_donated : {type:Boolean, required:true, default:false},
    last_donate : {type: Date}
});

var Donador = mongoose.model('donador', donadorSchema);

module.exports = Donador;