# API-REST-Bank-Cubos-Challenge

**English README:**

# Banking API

This is a simple API for managing bank accounts, transactions, and balances. It provides endpoints to create accounts, perform transactions like deposits, withdrawals, and transfers, and retrieve account information.

# Note
Please be aware that this project might not include elaborate input validation and security checks due to the specific requirements of the exercise and as part of the evaluation process at Cubos Academy. As this project is a part of a learning exercise, the focus has been more on demonstrating coding skills rather than implementing a full-fledged, production-ready application.

Additionally, the database used in this project is a mock representation and is not written with asynchronous functions. This design choice aligns with the challenge's intention to exclude data persistence aspects and to focus on the core functionalities of the application.



## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies by running:

```sh
npm install
```

## Usage

1. Start the server:

```sh
npm start
```

2. Access the API at `http://localhost:3000`.

## Endpoints

### List Accounts

**GET** `/accounts`

Retrieves a list of all bank accounts.

### Create Account

**POST** `/accounts`

Creates a new bank account. Requires providing account details in the request body.

### Update Account

**PUT** `/accounts/:accountNumber/user`

Updates account information. Requires the account number in the URL parameter and updated information in the request body.

### Delete Account

**DELETE** `/accounts/:accountNumber`

Deletes an account. Requires the account number in the URL parameter.

### Deposit

**POST** `/transactions/deposit`

Performs a deposit into an account. Requires the account number and deposit amount in the request body.

### Withdraw

**POST** `/transactions/withdraw`

Performs a cash withdrawal from an account. Requires the account number, withdrawal amount, and account password in the request body.

### Transfer

**POST** `/transactions/transfer`

Transfers funds from one account to another. Requires the account numbers of both sender and receiver, transfer amount, and sender's account password in the request body.

### Balance

**GET** `/accounts/balance`

Retrieves the account balance. Requires the account number and account password as query parameters.

### Transaction History

**GET** `/accounts/history`

Retrieves the transaction history for an account. Requires the account number and account password as query parameters.

## Middleware

To ensure secure access to certain endpoints, a middleware is implemented to verify the access using the bank's password. This password should be provided as a query parameter.

## Contributors

- Danilo Freiria

---

**Portuguese README:**

# API de Bancos

Esta é uma API simples para gerenciar contas bancárias, transações e saldos. Ela fornece endpoints para criar contas, realizar transações como depósitos, saques e transferências, e obter informações da conta.

# Nota
Esteja ciente de que este projeto pode não incluir verificações elaboradas de entrada e checagens de segurança devido aos requisitos específicos do exercício e como parte do processo de avaliação da Cubos Academy. Como este projeto pode ser parte de um exercício de aprendizado, o foco pode ter sido mais em demonstrar habilidades de codificação do que em implementar um aplicativo pronto para produção.

Além disso, o banco de dados usado neste projeto é uma representação fictícia e não é escrito com funções assíncronas. Essa escolha de design está alinhada com a intenção do desafio de excluir aspectos de persistência de dados e focar nas funcionalidades principais do aplicativo.

## Instalação

1. Clone este repositório para sua máquina local.
2. Navegue até o diretório do projeto.
3. Instale as dependências necessárias executando:

```sh
npm install
```

## Uso

1. Inicie o servidor:

```sh
npm start
```

2. Acesse a API em `http://localhost:3000`.

## Endpoints

### Listar Contas

**GET** `/contas`

Recupera uma lista de todas as contas bancárias.

### Criar Conta

**POST** `/contas`

Cria uma nova conta bancária. Requer fornecer os detalhes da conta no corpo da solicitação.

### Atualizar Conta

**PUT** `/contas/:numeroConta/usuario`

Atualiza as informações da conta. Requer o número da conta no parâmetro URL e as informações atualizadas no corpo da solicitação.

### Excluir Conta

**DELETE** `/contas/:numeroConta`

Exclui uma conta. Requer o número da conta no parâmetro URL.

### Depósito

**POST** `/transacoes/depositar`

Realiza um depósito em uma conta. Requer o número da conta e o valor do depósito no corpo da solicitação.

### Saque

**POST** `/transacoes/sacar`

Realiza um saque em dinheiro de uma conta. Requer o número da conta, o valor do saque e a senha da conta no corpo da solicitação.

### Transferência

**POST** `/transacoes/transferir`

Transfere fundos de uma conta para outra. Requer os números das contas do remetente e do destinatário, o valor da transferência e a senha da conta do remetente no corpo da solicitação.

### Saldo

**GET** `/contas/saldo`

Recupera o saldo da conta. Requer o número da conta e a senha da conta como parâmetros de consulta.

### Histórico de Transações

**GET** `/contas/extrato`

Recupera o histórico de transações de uma conta. Requer o número da conta e a senha da conta como parâmetros de consulta.

## Middleware

Para garantir o acesso seguro a determinados endpoints, um middleware é implementado para verificar o acesso usando a senha do banco. Esta senha deve ser fornecida como um parâmetro de consulta.

## Contribuidores

- Danilo Freiria


