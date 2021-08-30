const db = require('../database');

module.exports = {
    getAll: (account_id) => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT * FROM cards WHERE account_id = ?', [account_id], (error, results) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(results);
            });
        });
    },

    getCardById: (account_id, id) => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT * FROM cards WHERE account_id = ? and id = ?', [account_id, id], (error, result) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(result[0]);
            });
        });
    },

    create: (card) => {
        return new Promise((accepted, rejected) => {
            db.query('INSERT INTO cards (id, number, type, flag, limitt, closed_at, current_value, account_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [card.id, card.number, card.type, card.flag, card.limitt, card.closed_at, card.current_value, card.account_id], (error, result) => {

                    if (error) {
                        rejected(error.sqlMessage);
                    }

                    accepted(true);
                });
        });
    },

    changeCardById: (card) => {
        return new Promise((accepted, rejected) => {
            db.query('UPDATE cards SET number = ?, type = ?, flag = ?, limitt = ?, closed_at = ?, current_value = ? WHERE id = ?',
                [card.number, card.type, card.flag, card.limitt, card.closed_at, card.current_value, card.id], (error, result) => {

                    if (error) {
                        rejected(error.sqlMessage);
                    }

                    accepted(true);
                });
        });
    },

    removeCardById: (id) => {
        return new Promise((accepted, rejected) => {
            db.query('DELETE FROM cards WHERE id = ?', [id], (error, result) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                accepted(true);
            });
        });
    },

    filterCardByDate: (date_from, date_to) => {
        return new Promise((accepted, rejected) => {
            if (date_from && date_to) {
                db.query('SELECT * FROM cards WHERE closed_at BETWEEN ? AND ?', [date_from, date_to], (error, result) => {
                    if (error) {
                        rejected(error.sqlMessage);
                    }

                    accepted(result);
                });
            }

            if (date_from && !date_to) {
                db.query('SELECT * FROM cards WHERE closed_at >= ?', [date_from], (error, result) => {
                    if (error) {
                        rejected(error.sqlMessage);
                    }

                    accepted(result);
                });
            }

            if (!date_from && date_to) {
                db.query('SELECT * FROM cards WHERE closed_at <= ?', [date_to], (error, result) => {
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
            db.query('SELECT MAX(id) as id FROM cards', (error, result) => {
                if (error) {
                    rejected(error.sqlMessage);
                }

                result[0].id != null ? accepted(result[0].id) : accepted(0);
            });
        });
    }
};