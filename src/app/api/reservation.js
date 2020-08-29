const db = require('../../config/database')
const ReservationDao = require('../infra/reservation-dao')

module.exports = app => {

    const sendReservation = async(req, res) => {
        const {nome, tipo, data_chegada, data_saida, valor} = req.body

        const dao = new ReservationDao(db)

        if(data_chegada > data_saida) return res.send("Insira uma data de saida deve ser maior que a de entrada")

        if(!nome || !tipo || !data_chegada || !data_saida || !valor)  return res.send("Todos os campos devem ser preenchidos")
        
        await dao.save(req.body)
        .then(resp => res.send("Sucesso!!!!!!"))
        .catch(err => res.send(err))
    }

    const getReservation = async(req, res) => {
        const dao = new ReservationDao(db);
        await dao.list()
        .then(resp => res.send(resp))
        .catch(err => res.send(err))
    }

    return {sendReservation, getReservation}
}