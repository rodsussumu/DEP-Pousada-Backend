module.exports = app => {

    app.route('/feedback')
        .get(app.src.app.api.users.viewFeedback)
        .post(app.src.app.api.users.sendFeedback)

    app.route('/reserva')
        .get(app.src.app.api.reservation.getReservation)
        .post(app.src.app.api.reservation.sendReservation)

    app.route('/reserva/:id')
        .delete(app.src.app.api.reservation.delReservation)
}