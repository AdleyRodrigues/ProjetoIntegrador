const auth = require('basic-auth');
const loginController = require('../controller/Logincontroller');
const Account = require('../model/AccountModel');

basicAuth = async (req, res, next) => {
    const { name, pass } = await auth(req);

    let account = new Account();
    account.email = name;
    account.password = pass;
    
    loginController.login(account).then(result => {
        if (result.error) {
            res.json(result);
        }
    
        next();
    }).catch(error => {
        res.json(error);
    });
}

module.exports = basicAuth;