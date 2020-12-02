const jwt = require('jsonwebtoken');
//  ===========================================
//  Verificar Token
//  ===========================================

let verificaToken = (req, res, next) => {

    let token = req.get('token');
 
    jwt.verify(token, process.env.SEED, (err, decoded) => {
      
        if (err) {
            
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;


        
        next();

    });



};

//  ===========================================
//  Verificar Admin Rol
//  ===========================================

let verificaAdminRole = (req, res, next) => {
 
   const usuariodb= req.usuario.role
   console.log(usuariodb)
 if (usuariodb === 'ADMIN'){
     next()
 }else {
     return res.json({
         ok: false,
         err:{
             message: 'El usuario NO es Administrador'
         }
     })
 }
};


module.exports = {verificaToken,verificaAdminRole}