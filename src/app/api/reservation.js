const db = require('../../config/database');
const ReservationDao = require('../infra/reservation-dao');

module.exports = app => {

    const sendReservation = async(req, res) => {
        const {nome, tipo, data_chegada, data_saida, valor} = req.body;
        console.log(req.body)
        if(!nome || !tipo || !data_chegada || !data_saida || !valor)  return res.send("Todos os campos devem ser preenchidos");

        if(data_chegada > data_saida) return res.send("Insira uma data de saida deve ser maior que a de entrada");

        const dao = new ReservationDao(db);

        if(tipo === 1) {
            const countVips = await dao.countTipo(1);
            if(countVips.quantidade >= 5) return res.send("Não temos mais quartos vip disponiveis no momento.");
            await dao.save(req.body)
            .then(resp => res.send("Sucesso!!!!!!"))
            .catch(err => res.send(err));
        } else{
            const countApartamento = await dao.countTipo(2);
            if(countApartamento.quantidade >= 10) return res.send("Não temos mais apartamentos disponiveis no momento.");
            await dao.save(req.body)
            .then(resp => res.send("Sucesso!!!!!!"))
            .catch(err => res.send(err));
        }
    }

    const getReservation = async(req, res) => {
        const dao = new ReservationDao(db);
        await dao.list()
        .then(resp => res.send(resp))
        .catch(err => res.send(err));
    }

    const delReservation = async(req, res) => {
        const {id} = req.params;
        const dao = new ReservationDao(db);
        await dao.delete(id)
        .then(resp => res.send("Reserva deletada com sucesso!"))
        .catch(err => res.send(err))
        res.send(id);
    }

    return {sendReservation, getReservation, delReservation}
}