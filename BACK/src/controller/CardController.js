const Card = require('../model/CardModel');
const cardRepository = require('../repository/CardRepository');

module.exports = {
    getAll: async (req, res) => {
        await cardRepository.getAll(req.params.account_id).then(results => res.json(results)).catch(error => res.json(error));
    },

    getCardById: async (req, res) => {
        await cardRepository.getCardById(req.params.account_id, req.params.id).then(result => res.json(result)).catch(error => res.json(error));
    },

    create: async(req, res) => {
        let card = new Card(await cardRepository.getMaxId() + 1, req.body.number, req.body.type, req.body.flag, req.body.limitt, req.body.closed_at, req.body.current_value, req.body.account_id);

        card.validateFields();

        if (!card.error) {
            await cardRepository.create(card).catch(error => card.error = error);
        }

        res.json(card);
    },

    changeCardById: async(req, res) => {
        let card = new Card(req.body.id, req.body.number, req.body.type, req.body.flag, req.body.limitt, req.body.closed_at, req.body.current_value, req.body.account_id);

        card.validateFields();

        if (!card.error) {
            await cardRepository.changeCardById(card).catch(error => card.error = error);
        }

        res.json(card);
    },

    removeCardById: async(req, res) => {
        await cardRepository.removeCardById(req.params.id)
        .catch(error => {
            let response;

            if (error.errno == 1451) {
                response = { error: "Cartão já está vinculado a uma despesa" }
                res.json(response);
            }
            else {
                response = { error: error.sqlMessage }
                res.json(response);
            }
        });
    },

    filterCardByDate: async (req, res) => {
        await cardRepository.filterCardByDate(req.body.date_from, req.body.date_to).then(results => res.json(results)).catch(error => res.json(error));
    }
}