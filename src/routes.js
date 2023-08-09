const express = require("express");
const { listBankAccount, createAccount, updateAccount, deleteAccount, deposit, grabCash, transferCash, balance, extract } = require("./controller/controller");
const { verifyAccess } = require("./middleware/mids");
const route = express();

//GET principal
route.get(("/contas"), verifyAccess, listBankAccount);

//POST para criar uma conta bancária
route.post(("/contas"), createAccount);

//PUT para editar contas
route.put(("/contas/:numeroConta/usuario"), updateAccount);

//DELETE para exclusão de contas
route.delete(("/contas/:numeroConta"), deleteAccount);

//POST para depósitos
route.post(("/transacoes/depositar"), deposit)

//POST para saque
route.post(("/transacoes/sacar"), grabCash);

//POST para transferêcias
route.post(("/transacoes/transferir"), transferCash);

//GET para saldo
route.get(("/contas/saldo"), balance);

//GET extrato
route.get(("/contas/extrato"), extract);
module.exports = {route}