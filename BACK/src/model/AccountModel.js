module.exports = class Account {
    constructor(id, name, avatar, email, password) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.email = email;
        this.password = password;
    }

    validateFields() {
        if (!this.name || !this.email || !this.password) {
            this.error = 'Preencha os campos Obrigatórios';
        }
    }
}