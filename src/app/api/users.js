const db = require('../../config/database');
const UserDao = require('../infra/user-dao');

module.exports = app => {

    const sendFeedback = async(req, res) => {
        const {nome, email, mensagem} = req.body;
        if(!nome || !email || !mensagem) {
            return res.status(400).send("Todos os campos precisam estar preenchidos");
        }
        const dao = new UserDao(db);
        dao.save(req.body)
            .then(resp => res.send("Sucesso, sua duvida/feedback será analisado por nossa equipe."))
            .catch(err => res.send(err));
    }

    const viewFeedback = async(req, res) => {
        const dao = new UserDao(db);
        dao.list()
        .then(resp => res.send(resp))
        .catch(err => res.send(err));
    }

    return {sendFeedback, viewFeedback}
}