const db = require('../database');

module.exports = {
    getAll: (account_id) => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT * FROM expenses WHERE account_id = ?', [account_id], (error, results) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(results);
            });
        });
    },

    getExpenseByDate: (account_id, card_id, date) => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT * FROM expenses WHERE account_id = ? and card_id = ? AND date < ?', 
                [account_id, card_id, date], (error, results) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(results);
            });
        });
    },

    organize: (account_id, option) => {
        return new Promise((accepted, rejected) => {
            db.query(`SELECT * FROM expenses WHERE account_id = ? ORDER BY ${option}`,
                [account_id], (error, results) => {
                if (error) {
                    rejected(error.sqlMessage);
                }
                
                accepted(results);
            });
        });
    },

    getExpenseById: (account_id, id) => {
        return new Promise((accepted, rejected) => {
            if (account_id && id) {
                db.query('SELECT * FROM expenses WHERE account_id = ? and id = ?', [account_id, id], (error, result) => {
                    if (error) {
                        rejected(error.sqlMessage);
                    }

                    accepted(result[0]);
                });
            }

            if (!account_id && id) {
                db.query('SELECT * FROM expenses WHERE id = ?', [id], (error, result) => {
                    if (error) {
                        rejected(error.sqlMessage);
                    }

                    accepted(result[0]);
                });
            }
        });
    },

    create: (expense) => {
        return new Promise((accepted, rejected) => {
            db.query('INSERT INTO expenses (id, amount, date, description, parcel, status, category_id, card_id, account_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                [expense.id, expense.amount, expense.date, expense.description, expense.parcel, expense.status, expense.category_id, expense.card_id, expense.account_id], (error, result) => {
            
                if (error) {
                    rejected(error.sqlMessage);
                }
                
                accepted(true);
            });
        });
    },

    changeExpenseById: (expense) => {
        return new Promise((accepted, rejected) => {
            db.query('UPDATE expenses SET amount = ?, date = ?, description = ?, parcel = ?, status = ?, category_id = ?, card_id = ?, account_id = ? WHERE id = ?', 
                [expense.amount, expense.date, expense.description, expense.parcel, expense.status, expense.category_id, expense.card_id, expense.account_id, expense.id], (error, result) => {
            
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(true);
            });
        });
    },

    removeExpenseById: (id) => {
        return new Promise((accepted, rejected) => {
            db.query('DELETE FROM expenses WHERE id = ?', [id], (error, result) => {
                if (error) {
                    rejected(error.sqlMessage);
                }
                
                accepted(true);
            });
        });
    },

    getMaxId: () => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT MAX(id) as id FROM expenses', (error, result) => {
                if (error) {
                    rejected(error.sqlMessage);
                }
 
                result[0].id != null ? accepted(result[0].id) : accepted(0);
            });
        });
    }
};