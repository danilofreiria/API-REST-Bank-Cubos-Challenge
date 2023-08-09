const {banco} = require("../bancodedados");

const verifyAccess = (req, res, next) => {
    const password = req.query.senha_banco;

    if (!password) {return res.status(400).json( "mensagem: Campo senha é obrigatório")};
    if (password !== banco.senha) {return res.status(401).json( "mensagem: Usuário não autorizado")};
    
    next();

};


module.exports = {verifyAccess}