const db = require('../database');

module.exports = {
    getAll: (expense_id) => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT * FROM parcels WHERE expense_id = ?', [expense_id], (error, results) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(results);
            });
        });
    },

    create: (parcel) => {

        return new Promise((accepted, rejected) => {
            db.query('INSERT INTO parcels (id, due_date, amount, expense_id) VALUES (?, ?, ?, ?)',
                [parcel.id, parcel.due_date, parcel.amount, parcel.expense_id], (error, result) => {

                    if (error) {
                        rejected(error.sqlMessage);
                    }

                    accepted(true);
                });
        });
    },

    removeParcels: (expense_id) => {
        return new Promise((accepted, rejected) => {
            db.query('DELETE FROM parcels WHERE expense_id = ?', [expense_id], (error, result) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(true);
            });
        });
    },

    getMaxId: () => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT MAX(id) as id FROM parcels', (error, result) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                result[0].id != null ? accepted(result[0].id) : accepted(0);
            });
        });
    }
};