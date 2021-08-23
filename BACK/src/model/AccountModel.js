const emailValidator = require('email-validator');

module.exports = class Account {
    constructor(id, name, avatar, email, password) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.email = email;
        this.password = password;
    }

    validateFields() {
        if (!this.name) {
            this.error = 'Informe um nome';
            return;
        }

        if (!this.email) {
            this.error = 'Informe um email';
            return;
        } else {
            if (!emailValidator.validate(this.email)) {
                this.error = 'Email inválido';
                return;
            }
        }

        if (!this.password) {
            this.error = 'informe uma senha';
            return;
        }
    }

    validateLoginFields(email, password) {
        if (!email) {
            this.error = 'Informe um email';
            return;
        } else {
            if (!emailValidator.validate(email)) {
                this.error = 'Email inválido';
                return;
            }
        }

        if (!password) {
            this.error = 'informe uma senha';
            return;
        }
    }
}