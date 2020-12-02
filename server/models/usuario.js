const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator'); //Corrije mensaje de error elementos unicos


let Schema = mongoose.Schema;


//--------------------------------------Variable para asignar roles y mensaje si hay error
let rolesValidos = {
    values :['ADMIN','PAÑOLERO','PRACTICANTE','USUARIO'],
    message: '{VALUE} no es un rol valido'
};


//--------------------------------------Modelo Usuario

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    role: {
        type: String,
        default: 'USUARIO',
        enum: rolesValidos
      
    },
    estado: {
        type: Boolean,
        default: true
    }
});

/*usuarioSchema.method.toJSON = function(){
    let user = this;
    let userObject = user.toObject()
    delete userObject.password;                     funcion que debo arreglar, problema resuelto a la fuerza
    return userObject
}*/


//------------------------------------------Llamada a mongoose-unique-validator
usuarioSchema.plugin(uniqueValidator, {
    message: 'El    {PATH} debe de ser unico'
})


module.exports = mongoose.model('Usuario', usuarioSchema);