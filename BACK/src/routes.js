const express = require("express");
const multer = require('multer');
const router = express.Router();
const accountController = require('./controller/AccountController');
const expenseController = require('./controller/ExpenseController');

const permission = (req, res, next) => {
    if (!req.session.account) {
        return res.json({ error: 'Sem autorização' });
    }

    next();
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Contas
router.get('/accounts', permission, accountController.getAll);
router.get('/accounts/:email', permission, accountController.getAccountByEmail);
router.get('/accounts/edit/:id', permission, accountController.getAccountById);
router.post('/accounts/create', upload.single('avatar'), accountController.create);
router.post('/login', accountController.login);
router.put('/accounts/edit', permission, accountController.changeAccountById);
router.delete('/accounts/:id', permission, accountController.removeAccountById);

// Despesas
router.get('/expenses', permission, expenseController.getAll);
router.get('/expenses/edit/:id', permission, expenseController.getAccountById);
router.post('/expenses/create', permission, expenseController.create);
router.put('/expenses/edit', permission, expenseController.changeAccountById);
router.delete('/expenses/:id', permission, expenseController.removeAccountById);

module.exports = router;