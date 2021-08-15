const db = require('../database');

module.exports = {
    getAll: () => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT * FROM accounts', (error, results) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(results);
            });
        });
    },

    getAccountByEmail: (email) => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT * FROM accounts WHERE email = ?', [email], (error, result) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(result);
            });
        });
    },

    create: (account) => {
        return new Promise((accepted, rejected) => {
            db.query('INSERT INTO accounts (id, name, avatar, email, password) VALUES (?, ?, ?, ?, ?)', 
                [account.id, account.name, account.avatar, account.email, account.password], (error, result) => {
            
                if (error) {
                    rejected(error.sqlMessage);
                }
                
                accepted(true);
            });
        });
    },

    changeAccountById: (account) => {
        return new Promise((accepted, rejected) => {
            db.query('UPDATE accounts SET name = ?, avatar = ?, email = ?, password = ? WHERE id = ?', 
                [account.name, account.avatar, account.email, account.password, account.id], (error, result) => {
            
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(true);
            });
        });
    },

    removeAccountById: (id) => {
        return new Promise((accepted, rejected) => {
            db.query('DELETE FROM accounts WHERE id = ?', [id], (error, result) => {
                if (error) {
                    rejected(error.sqlMessage);
                }
                
                accepted(true);
            });
        });
    },

    getMaxId: () => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT MAX(id) as id FROM accounts', (error, result) => {
                if (error) {
                    rejected(error.sqlMessage);
                }
 
                result[0].id != null ? accepted(result[0].id) : accepted(0);
            });
        });
    }
};