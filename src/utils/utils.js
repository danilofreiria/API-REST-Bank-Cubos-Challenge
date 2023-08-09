const {contas} = require("../bancodedados");


let id = 0;

const generateId = () => {
    id++;
    return id;
};

const verifyCpf = (cpf, contas) => {
    return contas.some((account) => account.usuario.cpf === cpf);
};

const verifyEmail = (email) => {
    return contas.some((account) => account.usuario.email === email);
};


// const verifyIdParamns = () => {
//     const accountId = Number(req.params.numeroConta);
//     const account = contas.find((accounts) => accounts.numero === accountId);

//     //Validando o id do paramns
//     if (!accountId) {return res.status(400).json({mensagem: "É necessário informar o número da conta!"})};

//     //Validando a existência da Conta
//     if (!account) {return res.status(404).json({mensagem: "A conta informada não existe!"})};
// }


const dateFormat = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const secounds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${secounds}`;
}


module.exports = { generateId, verifyCpf, verifyEmail, dateFormat}