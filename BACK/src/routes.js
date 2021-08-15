const express = require("express");
const router = express.Router();
const accountController = require('./controller/AccountController');

router.get('/accounts', accountController.getAll);
router.get('/accounts/:email', accountController.getAccountByEmail);
router.post('/accounts/create', accountController.create);
router.put('/accounts/edit/:id', accountController.changeAccountById);
router.delete('/accounts/:id', accountController.removeAccountById);

module.exports = router;