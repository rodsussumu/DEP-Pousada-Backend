module.exports = app => {

    app.route('/feedback')
        .get(app.app.api.users.viewFeedback)
        .post(app.app.api.users.sendFeedback)

    app.route('/reservas')
        .get(app.app.api.reservation.getReservation)
        .post(app.app.api.reservation.sendReservation)

    app.route('/reserva/:id')
        .delete(app.app.api.reservation.delReservation)
}