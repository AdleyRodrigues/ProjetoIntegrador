const db = require('../database');

module.exports = {
    getAll: (account_id) => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT * FROM categories WHERE account_id = ?', [account_id], (error, results) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(results);
            });
        });
    },

    getCategoryById: (account_id, id) => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT * FROM categories WHERE account_id = ? and id = ?', [account_id, id], (error, result) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(result[0]);
            });
        });
    },

    create: (category) => {
        return new Promise((accepted, rejected) => {
            db.query('INSERT INTO categories (id, name, account_id) VALUES (?, ?, ?)',
                [category.id, category.name, category.account_id], (error, result) => {

                    if (error) {
                        rejected(error.sqlMessage);
                    }

                    accepted(true);
                });
        });
    },

    changeCategoryById: (category) => {
        return new Promise((accepted, rejected) => {
            db.query('UPDATE categories SET name = ? WHERE id = ?',
                [category.name, category.id], (error, result) => {

                    if (error) {
                        rejected(error.sqlMessage);
                    }

                    accepted(true);
                });
        });
    },

    removeCategoryById: (id) => {
        return new Promise((accepted, rejected) => {
            db.query('DELETE FROM categories WHERE id = ?', [id], (error, result) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(true);
            });
        });
    },

    getMaxId: () => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT MAX(id) as id FROM categories', (error, result) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                result[0].id != null ? accepted(result[0].id) : accepted(0);
            });
        });
    }
};