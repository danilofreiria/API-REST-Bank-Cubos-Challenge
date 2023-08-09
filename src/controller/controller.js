const {banco, contas, depositos, saques, transferencias} = require("../bancodedados")
const {generateId, verifyCpf, verifyEmail, dateFormat} = require("../utils/utils")

//Controlador do GET inicial
const listBankAccount = (req, res) => { 
    res.status(200).json(contas);
};

//Controlador criação de contas
const createAccount = (req, res) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body;
    let numberId = generateId();

    //Verificando se todos os campos foram preenchidos
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({mensagem: "Todos os campos devem ser preenchidos"});
    }

    //Validação de CPF único
   if (verifyCpf(cpf, contas)) {
    return res.status(400).json({mensagem: "CPF já cadastrado!"})
   }

    //Validação de e-mail único
    if (verifyEmail(email, contas)) {
        return res.status(400).json({mensagem: "E-mail já cadastrado!"});
    }


    //Criação da variável a ser "pushada" para a propriedade CONTAS
    const newAccount = {
            numero: numberId.toString(), //gerando ID único
            saldo: 0,
            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }
        }

    contas.push(newAccount);

    return res.status(201).json({newAccount});


}

//Controlador edição de contas
const updateAccount = (req, res) => {

    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body;

    const accountId = req.params.numeroConta;
    const account = contas.find((accounts) => accounts.numero === accountId);

    //Validando o id do paramns
    if (!accountId) {
        return res.status(400).json({mensagem: "É necessário informar o número da conta!"});
    };

    //Validando a existência da Conta
    if (!account) {
        return res.status(404).json({mensagem: "A conta informada não existe!"});
    }

    //Validando que ao menos uma das propriedades será alterada
    if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
        return res.status(400).json({mensagem: "Ao menos uma das propriedades deve ser preenchida para a alteração!"});
    }

    //Atualizando as propriedades preenchidas

    if (cpf) {
        if (verifyCpf(cpf, contas)) {
            return res.status(400).json({ mensagem: "CPF já cadastrado!" });
        } else {
            account.usuario.cpf = cpf;
        }
    }

    if (email) {
        if (verifyEmail(email, contas)) {
            return res.status(400).json({ mensagem: "E-mail já cadastrado!" });
        } else {
            account.usuario.email = email;
        }  
    }

    if (nome) {
        account.usuario.nome = nome;
    }

    if (data_nascimento) {
        account.usuario.data_nascimento = data_nascimento;
    }

    if (telefone) {
        account.usuario.telefone = telefone;
    }

    if (senha) {
        account.usuario.senha = senha;
    }

    return res.status(200).json({mensagem: "Cadastro atualizado com sucesso!"})
}

//Controlador exclusão de contas
const deleteAccount = (req, res) => {
    const accountId = req.params.numeroConta;
    const accountIndex = contas.findIndex((account) => account.numero === accountId);

    // Validando o id do parâmetro
    if (!accountId) {
        return res.status(400).json({ mensagem: "É necessário informar o número da conta!" });
    }

    // Verificando a existência da conta
    if (accountIndex === -1) {
        return res.status(404).json({ mensagem: "A conta informada não existe!" });
    }

    // Verificando o saldo da conta bancária
    if (contas[accountIndex].saldo !== 0) {
        return res.status(403).json({ mensagem: "Não é possível deletar uma conta com saldo!" });
    }

    // Removendo a conta do objeto de persistência de dados.
    contas.splice(accountIndex, 1);

    // Resposta positiva
    return res.status(200).json({ mensagem: "Conta excluída com sucesso" });
};

//Controlador para depósito
const deposit = (req, res) => {

     //Declarando as variáveis que pegam o valor no body (não desestruturo para poder manter as variáveis em inglês)
     const accountId = req.body.numero_conta;
     const value = req.body.valor;
     const accountIndex = contas.findIndex((account) => account.numero === accountId);
     let date = (new Date());
     const finalDate = dateFormat(date)
 
     // Validando o id do parâmetro
     if (!accountId) {
         return res.status(400).json({ mensagem: "É necessário informar o número da conta!" });
     }
 
     // Verificando a existência da conta
     if (accountIndex === -1) {
         return res.status(404).json({ mensagem: "A conta informada não existe!" });
     }
 
     //Verificando se valor é negativo ou zero
     if (value <= 0) {return res.status(400).json({ mensagem: "Não é possível depositar valores iguais ou menor a zero" })};
 
     //Realizando o depósito
     contas[accountIndex].saldo += value;
 
     //Comprovante de depósito
     const depositReceipt = {
         data: finalDate,
         numero_conta: accountId,
         valor: value
     }
 
     //Registrando o comprovante na propriedade "depósitos" do bando de dados
     depositos.push(depositReceipt);
 
     return res.status(200).json({ mensagem: "Depósito realizado com sucesso!" });
}

//Controlador de Saque
const grabCash = (req, res) => {
    //Declarando as variáveis que pegam o valor no body (não desestruturo para poder manter as variáveis em inglês)
    const accountId = req.body.numero_conta;
    const value = req.body.valor;
    const password = req.body.senha;
    const accountIndex = contas.findIndex((account) => account.numero === accountId);
    let date = (new Date());
    const finalDate = dateFormat(date)

    // Validando o id do parâmetro
    if (!accountId) {
        return res.status(400).json({ mensagem: "É necessário informar o número da conta!" });
    }

    // Verificando a existência da conta
    if (accountIndex === -1) {
        return res.status(404).json({ mensagem: "A conta informada não existe!" });
    }

    //Verificando a senha
    if (password !== contas[accountIndex].usuario.senha) {
        return res.status(403).json({mensagem: "Senha incorreta. Tente novamente, por favor."});
    }

    //Verificando se valor é negativo, zero, ou maior que o saldo existente
    if (value <= 0 || value > contas[accountIndex].saldo) {
        return res.status(400).json({ mensagem: "Não é possível realizar esse saque!" });
    }

    //Realizando o o saque
    contas[accountIndex].saldo -= value;

    //Comprovante de depósito
    const grabReceipt = {
        data: finalDate,
        numero_conta: accountId,
        valor: value
    }

    //Registrando o comprovante na propriedade "saques" do bando de dados
    saques.push(grabReceipt);

    return res.status(200).json({ mensagem: "Saque realizado com sucesso!" });
}

//Controlador de transferência
const transferCash = (req, res) => {

    //Declarando as variáveis recebidas pelo body
    const origAccount = req.body.numero_conta_origem;
    const destAccount = req.body.numero_conta_destino;
    const password = req.body.senha;
    const value = req.body.valor;
    let date = (new Date());
    const finalDate = dateFormat(date);

    //Garantindo que todas os campos foram preenchidos
    if (!origAccount || !destAccount || !password || !value) {
    return res.status(400).json({mensagem: "Todos os campos devem ser preenchidos!"});
    }

    //Encontrando o index das contas:
    const origAccountIndex = contas.findIndex((account) => account.numero === origAccount);
    const destAccountIndex = contas.findIndex((account) => account.numero === destAccount);

    // Verificando a existência da conta
    if (origAccountIndex === -1 || destAccountIndex === -1) {
        return res.status(404).json({ mensagem: "Uma das contas informadas não existe!" });
    }

    //Validando a senha da conta de origem
    if (password !== contas[origAccountIndex].usuario.senha) {
        return res.status(403).json({mensagem: "Senha incorreta. Tente novamente, por favor."});
    }

    //Verificando se valor é negativo, zero, ou maior que o saldo existente
    if (value <= 0 || value > contas[origAccountIndex].saldo) {
        return res.status(400).json({ mensagem: "Não é possível realizar a transferência!" });
    }

    //Retirando o valor na Conta origem
    contas[origAccountIndex].saldo -= value;

    //Acrescentando o valor na Conta destino
    contas[destAccountIndex].saldo += value;

    //Comprovante de transferência
    const transferReceipt = {
        data: finalDate,
        numero_conta_origem: origAccount,
        numero_conta_destino: destAccount,
        valor: value
    }

    //Registrando o comprovante na propriedade "transferências" do bando de dados
    transferencias.push(transferReceipt);

    return res.status(200).json({ mensagem: "Transferência realizada com sucesso!" });
}

//Controlador Saldo
const balance = (req, res) => {

    //Declarando as variaveis com o query
    const accountId = req.query.numero_conta;
    const password = req.query.senha;
    const accountIndex = contas.findIndex((account) => account.numero === accountId);

    //Verificando se o id e senha foram informados
    if (!accountId || !password) {
        res.status(400).json({mensagem: "Todos os campos devem ser preenchidos"});
    }
    // Verificando a existência da conta
    if (accountIndex === -1) {
        return res.status(404).json({ mensagem: "A conta informada não existe!" });
    }
    
    //Verificando a senha
    if (password !== contas[accountIndex].usuario.senha) {
        return res.status(403).json({mensagem: "Senha incorreta. Tente novamente, por favor."});
    }

    //Se tudo certo, exibindo o saldo
    const totalBalance = contas[accountIndex].saldo;
    return res.status(200).json({totalBalance});

}

//Controlador Extrato
const extract = (req, res) => {

    //Declarando as variaveis com o query
    const accountId = req.query.numero_conta;
    const password = req.query.senha;
    const accountIndex = contas.findIndex((account) => account.numero === accountId);

    //Verificando se o id e senha foram informados
    if (!accountId || !password) {
        res.status(400).json({mensagem: "Todos os campos devem ser preenchidos"});
    }
    // Verificando a existência da conta
    if (accountIndex === -1) {
        return res.status(404).json({ mensagem: "A conta informada não existe!" });
    }
    
    //Verificando a senha
    if (password !== contas[accountIndex].usuario.senha) {
        return res.status(403).json({mensagem: "Senha incorreta. Tente novamente, por favor."});
    }

    //Aglutinando os registros de depósitos/saques/transferencias feitas e recebidas
    const depositExtract = depositos.filter((deposits) => deposits.numero_conta === accountId);
    const grabExtract = saques.filter((grabs) => grabs.numero_conta === accountId);
    const sendTransfer = transferencias.filter((transf) => transf.numero_conta_origem === accountId);
    const getTransfer = transferencias.filter((transf) => transf.numero_conta_destino === accountId);

    const totalExtract = {
        depositos: depositExtract,
        saques: grabExtract,
        transferenciasEnviadas: sendTransfer,
        transferenciasRecebidas: getTransfer
    };

    res.status(200).json({totalExtract});
}




module.exports = {listBankAccount, createAccount, updateAccount, deleteAccount, deposit, grabCash, transferCash, balance, extract}