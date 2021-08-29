const Expense = require('../model/ExpenseModel');
const expenseRepository = require('../repository/ExpenseRepository');

module.exports = {
    getAll: async(req, res) => {
        await expenseRepository.getAll(req.params.account_id).then(results => res.json(results)).catch(error => res.json(error));
    },

    getExpenseById: async(req, res) => {
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

    removeExpenseById: async(req, res) => {
        await expenseRepository.removeExpenseById(req.params.id).then(res.json('Despesa removida com sucesso.')).catch(error => res.json(error));
    },
}