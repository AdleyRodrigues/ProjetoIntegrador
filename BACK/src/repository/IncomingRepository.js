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

    getIncomingById: (account_id, id) => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT * FROM incomings WHERE account_id = ? and id = ?', [account_id, id], (error, result) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(result[0]);
            });
        });
    },

    create: (incoming) => {
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
            db.query('UPDATE incomings SET date = ?, income = ? WHERE id = ?',
                [incoming.date, incoming.income, incoming.id], (error, result) => {

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

    filterIncomingByDate: (date_from, date_to) => {
        return new Promise((accepted, rejected) => {
            if (date_from && date_to) {
                db.query('SELECT * FROM incomings WHERE date BETWEEN ? AND ?', [date_from, date_to], (error, result) => {
                    if (error) {
                        rejected(error.sqlMessage);
                    }

                    accepted(result);
                });
            }

            if (date_from && !date_to) {
                db.query('SELECT * FROM incomings WHERE date >= ?', [date_from], (error, result) => {
                    if (error) {
                        rejected(error.sqlMessage);
                    }

                    accepted(result);
                });
            }

            if (!date_from && date_to) {
                db.query('SELECT * FROM incomings WHERE date <= ?', [date_to], (error, result) => {
                    if (error) {
                        rejected(error.sqlMessage);
                    }

                    accepted(result);
                });
            }
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