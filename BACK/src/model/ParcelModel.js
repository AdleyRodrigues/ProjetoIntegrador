module.exports = class Parcel {
    constructor(id, due_date, amount, expense_id) {
        this.id = id;
        this.due_date = new Date(due_date);
        this.amount = new Number(amount).valueOf();
        this.expense_id = expense_id;
    }

    validateFields() {
        if (!this.due_date) {
            this.error = 'Parcela com data inválida';
            return;
        }

        if (!this.amount) {
            this.error = 'Parcela com valor inválido';
            return;
        }
    }
}