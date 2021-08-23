const Expense = require('../model/ExpenseModel');
const expenseRepository = require('../repository/ExpenseRepository');

module.exports = {
    getAll: async(req, res) => {
        await expenseRepository.getAll(req.session.account.id).then(results => res.json(results)).catch(error => res.json(error));
    },

    getAccountById: async(req, res) => {
        await expenseRepository.getAccountById(req.params.id).then(result => res.json(result)).catch(error => res.json(error));
    },

    getAccountByEmail: async(req, res) => {
        await expenseRepository.getAccountByEmail(req.params.email).then(result => res.json(result)).catch(error => res.json(error));
    },

    create: async(req, res) => {
        let card_id = (req.body.card_id != '' ? req.body.card_id : null);
        let expense = new Expense(await expenseRepository.getMaxId() + 1, req.body.date, req.body.description, req.body.parcel, req.body.status, req.body.category_id, card_id, req.session.account.id);

        expense.validateFields();

        if (!expense.error) {
            await expenseRepository.create(expense).catch(error => expense.error = error);
        }

        res.json(expense);
    },

    changeAccountById: async(req, res) => {
        let expense = new Account(req.body.id, req.body.name, req.body.avatar, req.body.email, req.body.password);
        
        expense.validateFields();

        if (!expense.error) {
            await expenseRepository.changeAccountById(expense).catch(error => expense.error = error);
        }

        res.json(expense);
    },

    removeAccountById: async(req, res) => {
        await expenseRepository.removeAccountById(req.params.id).then(res.json('Conta removida com sucesso.')).catch(error => res.json(error));
    },

    login: async(req, res) => {
        let expense = new Account();
        expense.validateLoginFields(req.body.email, req.body.password);

        if (!expense.error) {
            await expenseRepository.getAccountByEmail(req.body.email).then(result => {
                if (result.length > 0) {
                     if(result[0].password == req.body.password) {
                        expense = result[0];
                        delete expense.password;
                        req.session.expense = expense;
                     } else {
                         expense.error = 'Email ou senha inválidos';
                     }
                } else {
                    expense.error = 'Email ou senha inválidos';
                }
            }).catch(error => expense.error = error);
        }

        res.json(expense);
    }
}