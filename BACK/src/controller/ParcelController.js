const Parcel = require('../model/ParcelModel');
const parcelRepository = require('../repository/ParcelRepository');

module.exports = {
    getAll: async (req, res) => {
        await parcelRepository.getAll(req.params.expense_id).then(results => res.json(results)).catch(error => res.json(error));
    },

    getParcelByDate: async (req, res) => {
        await parcelRepository.getParcelByDate(req.params.expense_id, req.params.date).then(result => res.json(result)).catch(error => res.json(error));
    },

    create: async(req, res) => {
        let parcel = new Parcel(await parcelRepository.getMaxId() + 1, req.body.date, req.body.amount, req.body.expense_id);

        parcel.validateFields();

        if (!parcel.error) {
            await parcelRepository.create(parcel).catch(error => parcel.error = error);
        }

        res.json(parcel);
    },

    removeParcels: async(req, res) => {
        await parcelRepository.removeParcels(req.params.expense_id).then(res.json('Receita removida com sucesso.')).catch(error => res.json(error));
    },
}