const Account = require('../model/AccountModel');
const accountRepository = require('../repository/AccountRepository');
const fs = require('fs');

module.exports = {
    getAccountById: async (req, res) => {
        await accountRepository.getAccountById(req.params.id).then(result => res.json(result)).catch(error => res.json(error));
    },

    getAccountByEmail: async (req, res) => {
        await accountRepository.getAccountByEmail(req.params.email).then(result => res.json(result)).catch(error => res.json(error));
    },

    create: async (req, res) => {
        let avatar = req.file ? `uploads/${req.file.originalname}` : '';
        let account = new Account(await accountRepository.getMaxId() + 1, req.body.name, avatar, req.body.email, req.body.password);

        account.validateFields();

        if (!account.error) {
            await accountRepository.create(account).catch(error => account.error = error);
        }

        res.json(account);
    },

    changeAccountById: async (req, res) => {
        let avatar = req.file ? `uploads/${req.file.originalname}` : '';
        let account = new Account(req.body.id, req.body.name, avatar, req.body.email, req.body.password);
        
        account.validateFields();

        let oldAccount = await accountRepository.getAccountById(account.id);

        if (!account.error) {
            await accountRepository.changeAccountById(account)
            .then(result => {
                fs.access(`public/${oldAccount.avatar}`, fs.constants.F_OK, (err) => {
                    if (!err) {
                        fs.unlink(`public/${oldAccount.avatar}`, (erro) => {
                            if (erro) throw erro;
                        });
                    }
                }); 
            })
            .catch(error => account.error = error);
        }

        res.json(account);
    },

    removeAccountById: async (req, res) => {
        await accountRepository.removeAccountById(req.params.id).then(res.json('Conta removida com sucesso.')).catch(error => res.json(error));
    }
}