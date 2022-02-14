module.exports = class Incoming {
    constructor(id, date, income, account_id) {
        this.id = id;
        this.date = date;
        this.income = new Number(income).valueOf();
        this.account_id = account_id;
    }

    validateFields() {
        if (!this.date) {
            this.error = 'Informe uma data';
            return;
        }

        if (!this.income) {
            this.error = 'Informe um valor';
            return;
        }else {
            if(this.income < 0){
                this.error = 'Informe um valor maior que zero';
                return;
            }
        }

        if (!this.account_id) {
            this.error = 'Receita sem vinculo com usuário. Faça login novamente';
            return;
        }
    }
}