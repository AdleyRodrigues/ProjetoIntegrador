const Incoming = require('../model/IncomingModel');
const incomingRepository = require('../repository/IncomingRepository');

module.exports = {
    getAll: async (req, res) => {
        await incomingRepository.getAll(req.params.account_id).then(results => res.json(results)).catch(error => res.json(error));
    },

    getIncomingById: async (req, res) => {
        await incomingRepository.getIncomingById(req.params.account_id, req.params.id).then(result => res.json(result)).catch(error => res.json(error));
    },

    create: async(req, res) => {
        let incoming = new Incoming(await incomingRepository.getMaxId() + 1, req.body.date, req.body.amount, req.body.account_id);

        incoming.validateFields();

        if (!incoming.error) {
            await incomingRepository.create(incoming).catch(error => incoming.error = error);
        }

        res.json(incoming);
    },

    changeIncomingById: async(req, res) => {
        let incoming = new Incoming(req.body.id, req.body.date, req.body.amount, req.body.account_id);

        incoming.validateFields();

        if (!incoming.error) {
            await incomingRepository.changeIncomingById(incoming).catch(error => incoming.error = error);
        }

        res.json(incoming);
    },

    removeIncomingById: async(req, res) => {
        await incomingRepository.removeIncomingById(req.params.id).then(res.json('Receita removida com sucesso.')).catch(error => res.json(error));
    },

    filterIncomingByDate: async (req, res) => {
        await incomingRepository.filterIncomingByDate(req.body.date_from, req.body.date_to).then(results => res.json(results)).catch(error => res.json(error));
    }
}