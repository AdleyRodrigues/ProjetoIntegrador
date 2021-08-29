const express = require("express");
const router = express.Router();
const upload = require('./services/MulterConfig');
const Account = require('./model/AccountModel');
const accountController = require('./controller/AccountController');
const expenseController = require('./controller/ExpenseController');
const incomingController = require('./controller/IncomingController');
const loginController = require('./controller/Logincontroller');
const basicAuth = require('./services/BasicAuth');

// Login
router.post('/login', (req, res) => {
    const account = new Account();
    account.email = req.body.email;
    account.password = req.body.password;
    
    loginController.login(account).then(result => {
        if (result.error) {
            res.json(result);
        }

        res.json(result);
    }).catch(error => {
        res.json(error);
    });
});

// Contas
router.get('/accounts/:id', basicAuth, accountController.getAccountById);
router.post('/accounts/create', upload.single('avatar'), accountController.create);
router.put('/accounts/edit', basicAuth, accountController.changeAccountById);
router.delete('/accounts/:id', basicAuth, accountController.removeAccountById);

// Despesas
router.get('/expenses/:account_id', expenseController.getAll);
router.get('/expenses/:id', expenseController.getExpenseById);
//router.get('/expenses/edit/:id', expenseController.getExpenseById);
router.post('/expenses/create', expenseController.create);
router.put('/expenses/edit', expenseController.changeAccountById);
router.post('/expenses/:id', expenseController.removeExpenseById);

// Receitas
router.get('/incomings/:account_id', incomingController.getAll);
router.get('/incomings/:id', incomingController.getIncomingById);
router.post('/incomings/create', incomingController.create);
router.put('/incomings/edit', incomingController.changeIncomingById);
router.delete('/incomings/:id', incomingController.removeIncomingById);

module.exports = router;