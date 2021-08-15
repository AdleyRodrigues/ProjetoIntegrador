const Account = require('../model/AccountModel');
const accountRepository = require('../repository/AccountRepository');

module.exports = {
    getAll: async(req, res) => {
        await accountRepository.getAll().then(results => res.json(results)).catch(error => res.json(error));
    },

    getAccountByEmail: async(req, res) => {
        await accountRepository.getAccountByEmail(req.params.email).then(result => res.json(result)).catch(error => res.json(error));
    },

    create: async(req, res) => {
        let account = new Account(await accountRepository.getMaxId() + 1, req.body.name, req.body.avatar, req.body.email, req.body.password);

        account.validateFields();

        if (!account.error) {
            await accountRepository.create(account).catch(error => account.error = error);
        }

        res.json(account);
    },

    changeAccountById: async(req, res) => {
        let account = new Account(req.params.id, req.body.name, req.body.avatar, req.body.email, req.body.password);
        
        account.validateFields();

        if (!account.error) {
            await accountRepository.changeAccountById(account).catch(error => account.error = error);
        }

        res.json(account);
    },

    removeAccountById: async(req, res) => {
        await accountRepository.removeAccountById(req.params.id).then(res.json('Conta removida com sucesso.')).catch(error => res.json(error));
    }
}