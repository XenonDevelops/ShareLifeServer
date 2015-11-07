var mongoose = require('../connections/mongoose');
var Schema   = mongoose.Schema;

var experienciaSchema = new Schema({
    id_donatario : {type: Schema.Types.ObjectId, ref: 'donatario'},
    titulo : {type: String,required: true},
    contenido : {type: String,required: true},
    status : {type: Boolean, required: true, default:true},
    imagenes : [String],
    date_registry : {type: Date, default: Date.now},
    created_by : {type:String},
    img_creator: {type:String}
});

var Experiencia = mongoose.model('experiencia', experienciaSchema);

module.exports = Experiencia;