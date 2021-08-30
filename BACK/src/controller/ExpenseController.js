const Expense = require('../model/ExpenseModel');
const expenseRepository = require('../repository/ExpenseRepository');
const parcelRepository = require('../repository/ParcelRepository');
const Parcel = require('../model/ParcelModel');

module.exports = {
    getAll: async (req, res) => {
        await expenseRepository.getAll(req.params.account_id).then(results => res.json(results)).catch(error => res.json(error));
    },

    getExpenseById: async (req, res) => {
        await expenseRepository.getExpenseById(req.params.account_id, req.params.id)
            .then(result => res.json(result))
            .catch(error => res.json(error));
    },

    getAccountByEmail: async (req, res) => {
        await expenseRepository.getAccountByEmail(req.params.email)
            .then(result => res.json(result))
            .catch(error => res.json(error));
    },

    create: async (req, res) => {
        let card_id = (req.body.card_id != '' ? req.body.card_id : null);
        let expense = new Expense(await expenseRepository.getMaxId() + 1, req.body.amount, req.body.date, req.body.description, req.body.parcel, req.body.status, req.body.category_id, card_id, req.account.id);

        expense.validateFields();
        expense.validateBalance();

        if (!expense.error) {
            await expenseRepository.create(expense)
                .then(result => {
                    let parcelValue = expense.amount / expense.parcel;
                    let data = new Date(expense.date);

                    parcelRepository.removeParcels(expense.id);

                    for (let index = 0; index < expense.parcel; index++) {
                        let parcel = new Parcel(parcelRepository.getMaxId() + 1, data.setDate(data.getDate() + ((index + 1) * 30)), parcelValue, expense.id);
                        console.log(parcel);
                        parcelRepository.create(parcel)
                            .then(result => {
                                let card = cardRepository.getCardById(this.account_id, this.card_id);
                                card.current_value += this.amount;
                                cardRepository.changeCardById(card);
                            }).catch(error => {
                                parcelRepository.removeParcels(this.id);
                                expense.error = error;
                            });
                    }
                })
                .catch(error => expense.error = error);
        }

        res.json(expense);
    },

    changeExpenseById: async (req, res) => {
        let card_id = (req.body.card_id != '' ? req.body.card_id : null);
        let expense = new Expense(req.body.id, req.body.amount, req.body.date, req.body.description, req.body.parcel, req.body.status, req.body.category_id, card_id, req.account.id);

        expense.validateFields();

        if (!expense.error) {
            await expenseRepository.changeExpenseById(expense).catch(error => expense.error = error);
        }

        res.json(expense);
    },

    removeExpenseById: async (req, res) => {
        await expenseRepository.removeExpenseById(req.params.id).then(res.json('Despesa removida com sucesso.')).catch(error => res.json(error));
    },
}