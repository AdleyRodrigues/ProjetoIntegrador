const accountRepository = require('../repository/AccountRepository');

module.exports = {
    login: async (account) => {
        account.validateLoginFields(account.email, account.password);
        
        if (!account.error) {
                return accountRepository.getAccountByEmail(account.email).then(result => {
                    if (result && result.password == account.password) {
                        account.id = result.id;
                        account.name = result.name;
                        account.avatar = result.avatar;
                    } else {
                        account.error = "Usuário sem permissão de acesso.";
                    }
                    
                    return account;
                }).catch(error => account.error = error);
        }

        return account;
    }
}