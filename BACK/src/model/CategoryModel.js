module.exports = class Category {
    constructor(id, name, account_id) {
        this.id = id;
        this.name = name;
        this.account_id = account_id;
    }

    validateFields() {
        if (!this.name) {
            this.error = 'Informe um nome';
            return;
        }

        if (!this.account_id) {
            this.error = 'Receita sem vinculo com usuário. Faça login novamente';
            return;
        }
    }
}