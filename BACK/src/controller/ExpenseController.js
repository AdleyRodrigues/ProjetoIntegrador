const Expense = require('../model/ExpenseModel');
const expenseRepository = require('../repository/ExpenseRepository');
const parcelRepository = require('../repository/ParcelRepository');
const cardRepository = require('../repository/CardRepository');
const Parcel = require('../model/ParcelModel');

module.exports = {
    getAll: async (req, res) => {
        await expenseRepository.getAll(req.params.account_id)
            .then(results => res.json(results))
            .catch(error => res.json(error));
    },

    organize: async (req, res) => {
        await expenseRepository.organize(req.params.account_id, req.params.option)
            .then(results => res.json(results))
            .catch(error => res.json(error));
    },

    getExpenseById: async (req, res) => {
        await expenseRepository.getExpenseById(req.params.account_id, req.params.id)
            .then(result => res.json(result))
            .catch(error => res.json(error));
    },

    getExpenseByDate: async (req, res) => {
        await expenseRepository.getExpenseByDate(req.params.account_id, req.params.card_id, req.params.date)
            .then(result => res.json(result))
            .catch(error => res.json(error));
    },

    create: async (req, res) => {
        let card_id = (req.body.card_id != '' ? req.body.card_id : null);
        let expense = new Expense(await expenseRepository.getMaxId() + 1, req.body.amount, req.body.date, req.body.description, req.body.parcel, req.body.status, req.body.category_id, card_id, req.account.id);

        if (!expense.card_id || expense.card_id == 6) {
            expense.parcel = 1;
            expense.card_id = null;
        }

        expense.validateFields();
        expense.validateBalance();

        if (!expense.error) {
            await expenseRepository.create(expense).catch(error => expense.error = error);
        }

        if (!expense.error) {
            let parcelValue = expense.amount / expense.parcel;
            let data = new Date(expense.date);

            await parcelRepository.removeParcels(expense.id);

            for (let index = 0; index < expense.parcel; index++) {
                data = new Date(data.setDate(data.getDate() + 30));
                let parcel = new Parcel(await parcelRepository.getMaxId() + 1, data.setDate(data.getDate()) + 30, parcelValue, expense.id);

                await parcelRepository.create(parcel).catch(error => expense.error = error);
            }
        }

        if (!expense.error && expense.card_id) {
            let card = await cardRepository.getCardById(expense.account_id, expense.card_id);
            card.current_value += expense.amount;
            await cardRepository.changeCardById(card);
        }

        if (expense.error) {
            parcelRepository.removeParcels(this.id);

            if (expense.id)
                expenseRepository.removeExpenseById(expense.id);
        }

        res.json(expense);
    },

    changeExpenseById: async (req, res) => {
        let card_id = (req.body.card_id != '' ? req.body.card_id : null);
        let expense = new Expense(req.body.id, req.body.amount, req.body.date, req.body.description, req.body.parcel, req.body.status, req.body.category_id, card_id, req.account.id);

        if (!expense.card_id)
            expense.parcel = 1;

        let oldExpense = await expenseRepository.getExpenseById(expense.account_id, expense.id);

        expense.validateFields();
        expense.validateBalance();

        if (!expense.error) {
            await expenseRepository.changeExpenseById(expense).catch(error => expense.error = error);
        }

        if (!expense.error) {
            let parcelValue = expense.amount / expense.parcel;
            let data = new Date(expense.date);

            await parcelRepository.removeParcels(expense.id);

            for (let index = 0; index < expense.parcel; index++) {
                data = new Date(data.setDate(data.getDate() + 30));
                let parcel = new Parcel(await parcelRepository.getMaxId() + 1, data.setDate(data.getDate()) + 30, parcelValue, expense.id);

                await parcelRepository.create(parcel).catch(error => expense.error = error);
            }
        }

        if (!expense.error && expense.card_id) {
            let card = await cardRepository.getCardById(expense.account_id, expense.card_id);
            card.current_value -= oldExpense.amount;
            card.current_value += expense.amount;
            await cardRepository.changeCardById(card);
        }

        res.json(expense);
    },

    removeExpenseById: async (req, res) => {
        let oldExpense = await expenseRepository.getExpenseById(null, req.params.id);

        await expenseRepository.removeExpenseById(req.params.id).catch(error => { return res.json(error) });

        if (oldExpense.card_id) {
            let card = await cardRepository.getCardById(oldExpense.account_id, oldExpense.card_id);
            card.current_value -= oldExpense.amount;
            await cardRepository.changeCardById(card);
        }

        res.json('Despesa removida com sucesso.')
    },
}