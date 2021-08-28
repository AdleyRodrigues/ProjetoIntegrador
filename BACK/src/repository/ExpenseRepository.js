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

    getExpenseById: (id) => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT * FROM expenses WHERE id = ?', [id], (error, result) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(result[0]);
            });
        });
    },

    create: (expense) => {
        return new Promise((accepted, rejected) => {
            db.query('INSERT INTO expenses (id, date, description, parcel, status, category_id, card_id, account_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
                [expense.id, expense.date, expense.description, expense.parcel, expense.status, expense.category_id, expense.card_id, expense.account_id], (error, result) => {
            
                if (error) {
                    rejected(error.sqlMessage);
                }
                
                accepted(true);
            });
        });
    },

    changeAccountById: (expense) => {
        return new Promise((accepted, rejected) => {
            db.query('UPDATE expenses SET name = ?, avatar = ?, email = ?, password = ? WHERE id = ?', 
                [expense.name, expense.avatar, expense.email, expense.password, expense.id], (error, result) => {
            
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