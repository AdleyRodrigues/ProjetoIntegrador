module.exports = class Expense {
    constructor(id, date, description, parcel, status, category_id, card_id, account_id) {
        this.id = id;
        this.date = date;
        this.description = description;
        this.parcel = parcel;
        this.status = status;
        this.category_id = category_id;
        this.card_id = card_id;
        this.account_id = account_id;
    }

    validateFields() {
        if (!this.date) {
            this.error = 'Informe uma data';
            return;
        }

        if (!this.parcel) {
            this.error = 'Informe a parcela';
            return;
        }

        if (!this.status) {
            this.error = 'informe o status';
            return;
        }

        if (!this.category_id) {
            this.error = 'informe uma categoria';
            return;
        }

        if (!this.account_id) {
            this.error = 'Nenhuma conta vinculada a despesa';
            return;
        }
    }
}