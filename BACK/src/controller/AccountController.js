const Account = require('../model/AccountModel');
const accountRepository = require('../repository/AccountRepository');

module.exports = {
    getAll: async(req, res) => {
        await accountRepository.getAll().then(results => res.json(results)).catch(error => res.json(error));
    },

    getAccountById: async(req, res) => {
        await accountRepository.getAccountById(req.params.id).then(result => res.json(result)).catch(error => res.json(error));
    },

    getAccountByEmail: async(req, res) => {
        await accountRepository.getAccountByEmail(req.params.email).then(result => res.json(result)).catch(error => res.json(error));
    },

    create: async(req, res) => {
        let avatar = req.file ? req.file.originalname : '';
        let account = new Account(await accountRepository.getMaxId() + 1, req.body.name, avatar, req.body.email, req.body.password);

        account.validateFields();

        if (!account.error) {
            await accountRepository.create(account).catch(error => account.error = error);
        }

        res.json(account);
    },

    changeAccountById: async(req, res) => {
        let account = new Account(req.body.id, req.body.name, req.body.avatar, req.body.email, req.body.password);
        
        account.validateFields();

        if (!account.error) {
            await accountRepository.changeAccountById(account).catch(error => account.error = error);
        }

        res.json(account);
    },

    removeAccountById: async(req, res) => {
        await accountRepository.removeAccountById(req.params.id).then(res.json('Conta removida com sucesso.')).catch(error => res.json(error));
    },

    login: async(req, res) => {
        let account = new Account();
        account.validateLoginFields(req.body.email, req.body.password);

        if (!account.error) {
            await accountRepository.getAccountByEmail(req.body.email).then(result => {
                if (result.length > 0) {
                    if(result[0].password == req.body.password) {
                        account = result[0];
                        delete account.password;
                        req.session.account = account;
                    } else {
                        account.error = 'Email ou senha inválidos';
                    }
                } else {
                    account.error = 'Email ou senha inválidos';
                }
            }).catch(error => account.error = error);
        }

        res.json(account);
    }
}