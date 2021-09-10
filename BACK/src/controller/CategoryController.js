const Category = require('../model/CategoryModel');
const categoryRepository = require('../repository/CategoryRepository');

module.exports = {
    getAll: async (req, res) => {
        await categoryRepository.getAll(req.params.account_id)
            .then(results => res.json(results))
            .catch(error => res.json(error));
    },

    getCategoryById: async (req, res) => {
        await categoryRepository.getCategoryById(req.params.account_id, req.params.id)
            .then(result => res.json(result))
            .catch(error => res.json(error));
    },

    create: async (req, res) => {
        let category = new Category(await categoryRepository.getMaxId() + 1, req.body.name, req.body.account_id);

        category.validateFields();

        if (!category.error) {
            await categoryRepository.create(category).catch(error => category.error = error);
        }

        res.json(category);
    },

    changeCategoryById: async (req, res) => {
        let category = new Category(req.body.id, req.body.name, req.body.account_id);

        category.validateFields();

        if (!category.error) {
            await categoryRepository.changeCategoryById(category).catch(error => category.error = error);
        }

        res.json(category);
    },

    removeCategoryById: async (req, res) => {
        await categoryRepository.removeCategoryById(req.params.id)
            .catch(error => {
                let response;

                if (error.errno == 1451) {
                    response = { error: "Categoria já está vinculada a uma despesa" }
                    res.json(response);
                }
                else {
                    response = { error: error.sqlMessage }
                    res.json(response);
                }
            });
    }
}