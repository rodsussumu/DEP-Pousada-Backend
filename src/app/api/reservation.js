const db = require('../../config/database');
const ReservationDao = require('../infra/reservation-dao');

module.exports = app => {

    const sendReservation = async(req, res) => {
        const {nome, tipo, data_chegada, data_saida, valor} = req.body;
        console.log(req.body)
        if(!nome || !tipo || !data_chegada || !data_saida || !valor)  return res.send("Todos os campos devem ser preenchidos");

        const partsChegada =data_chegada.split('/');
        const transformDataChegada = new Date(partsChegada[2], partsChegada[1] - 1, partsChegada[0])

        const partsSaida =data_saida.split('/');
        const transformDataSaida = new Date(partsSaida[2], partsSaida[1] - 1, partsSaida[0])

        if(transformDataChegada > transformDataSaida) return res.send("Data de saida deve ser maior que a de entrada");

        let twoDaysAfter = new Date()
        twoDaysAfter.setDate(transformDataChegada.getDate() + 2)
        console.log(twoDaysAfter)
        console.log(transformDataSaida)

        if(transformDataSaida < twoDaysAfter) return res.send("Data de saida deve ser pelo menos 2 dias da data de chegada")

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