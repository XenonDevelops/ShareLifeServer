var mongoose = require('../connections/mongoose');
var Schema   = mongoose.Schema;

var decesoNotificacionSchema = new Schema({
    id_donante : {type: Schema.Types.ObjectId, ref: 'donatario'},
    nombre_donante : {type:String},
    tipo_sangre : {type:String},
    latitud : {type: String},
    longitud : {type: String},
    status : {type: Boolean, required: true, default:true},
    date_registry : {type: Date, default: Date.now}
});

var DecesoNotificacion = mongoose.model('deceso_notificacion', decesoNotificacionSchema);

module.exports = DecesoNotificacion;