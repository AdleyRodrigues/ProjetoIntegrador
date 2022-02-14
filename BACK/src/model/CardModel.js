module.exports = class Card {
    constructor(id, number, type, flag, limitt, closed_at, current_value, account_id) {
        this.id = id;
        this.number = number;
        this.type = type;
        this.flag = flag;
        this.limitt = new Number(limitt).valueOf();
        this.closed_at = new Number(closed_at).valueOf();
        this.current_value = new Number(current_value).valueOf();
        this.account_id = account_id;
    }

    validateFields() {
        if (!this.number) {
            this.error = 'Informe um número';
            return;
        } else {
            if (this.number.length != 16) {
                this.error = "Cartão com número inválido";
                return;
            }
        }

        if (!this.type) {
            this.error = 'Informe um tipo';
            return;
        }

        if (!this.flag) {
            this.error = 'Informe uma bandeira';
            return;
        }

        if (!this.closed_at) {
            this.error = 'Informe uma data de fechamento';
            return;
        }

        if (!this.limitt) {
            this.error = 'Informe um limite';
            return;
        }else{
            if(this.limitt < 0){
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