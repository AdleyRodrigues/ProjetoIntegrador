const db = require('../database');

module.exports = {
    getAll: (account_id) => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT * FROM incomings WHERE account_id = ?', [account_id], (error, results) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(results);
            });
        });
    },

    getIncomingById: (id) => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT * FROM incomings WHERE id = ?', [id], (error, result) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(result[0]);
            });
        });
    },

    create: (incoming) => {
        console.log(incoming);
        return new Promise((accepted, rejected) => {
            db.query('INSERT INTO incomings (id, date, income, account_id) VALUES (?, ?, ?, ?)', 
                [incoming.id, incoming.date, incoming.income, incoming.account_id], (error, result) => {
            
                if (error) {
                    rejected(error.sqlMessage);
                }
                
                accepted(true);
            });
        });
    },

    changeIncomingById: (incoming) => {
        return new Promise((accepted, rejected) => {
            db.query('UPDATE incomings SET date = ?, incoming = ? WHERE id = ?', 
                [incoming.date, incoming.incoming, incoming.id], (error, result) => {
            
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(true);
            });
        });
    },

    removeIncomingById: (id) => {
        return new Promise((accepted, rejected) => {
            db.query('DELETE FROM incomings WHERE id = ?', [id], (error, result) => {
                if (error) {
                    rejected(error.sqlMessage);
                }
                
                accepted(true);
            });
        });
    },

    getMaxId: () => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT MAX(id) as id FROM incomings', (error, result) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                result[0].id != null ? accepted(result[0].id) : accepted(0);
            });
        });
    }
};