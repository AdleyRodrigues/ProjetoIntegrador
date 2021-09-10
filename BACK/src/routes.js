const express = require("express");
const router = express.Router();
const upload = require('./services/MulterConfig');
const accountController = require('./controller/AccountController');
const expenseController = require('./controller/ExpenseController');
const incomingController = require('./controller/IncomingController');
const cardController = require('./controller/CardController');
const categoryController = require('./controller/CategoryController');
const parcelController = require('./controller/ParcelController');
const basicAuth = require('./services/BasicAuth');

// Login
router.post('/login', basicAuth, (req, res) => {
    res.json(req.account);
});

// Contas
router.get('/accounts/:id', basicAuth, accountController.getAccountById);
router.post('/accounts/create', upload.single('avatar'), accountController.create);
router.put('/accounts/edit', basicAuth, upload.single('avatar'), accountController.changeAccountById);
router.delete('/accounts/:id', basicAuth, accountController.removeAccountById);

// Despesas
router.get('/expenses/:account_id', basicAuth, expenseController.getAll);
router.get('/expenses/filter/:account_id/:option', basicAuth, expenseController.organize);
router.get('/expenses/:account_id/:card_id/:date', basicAuth, expenseController.getExpenseByDate);
router.get('/expenses/:account_id/:id', basicAuth, expenseController.getExpenseById);
router.post('/expenses/create', basicAuth, expenseController.create);
router.put('/expenses/edit', basicAuth, expenseController.changeExpenseById);
router.delete('/expenses/:id', basicAuth, expenseController.removeExpenseById);

// Receitas
router.get('/incomings/:account_id', basicAuth, incomingController.getAll);
router.post('/incomings/filter', basicAuth, incomingController.filterIncomingByDate);
router.get('/incomings/:account_id/:id', basicAuth, incomingController.getIncomingById);
router.post('/incomings/create', basicAuth, incomingController.create);
router.put('/incomings/edit', basicAuth, incomingController.changeIncomingById);
router.delete('/incomings/:id', basicAuth, incomingController.removeIncomingById);

// Cartões
router.get('/cards/:account_id', basicAuth, cardController.getAll);
router.post('/cards/filter', basicAuth, cardController.filterCardByDate);
router.get('/cards/:account_id/:id', basicAuth, cardController.getCardById);
router.post('/cards/create', basicAuth, cardController.create);
router.put('/cards/edit', basicAuth, cardController.changeCardById);
router.delete('/cards/:id', basicAuth, cardController.removeCardById);

// Cartegorias
router.get('/categories/:account_id', basicAuth, categoryController.getAll);
router.get('/categories/:account_id/:id', basicAuth, categoryController.getCategoryById);
router.post('/categories/create', basicAuth, categoryController.create);
router.put('/categories/edit', basicAuth, categoryController.changeCategoryById);
router.delete('/categories/:id', basicAuth, categoryController.removeCategoryById);

// Parcelas
router.get('/parcels/:expense_id', basicAuth, parcelController.getAll);
router.get('/parcels/:expense_id/:date', basicAuth, parcelController.getParcelByDate);
router.post('/parcels/create', basicAuth, parcelController.create);
router.delete('/parcels/:expense_id', basicAuth, parcelController.removeParcels);

module.exports = router;