class ReservationDao {
    constructor(db){
        this._db = db;
    }

    list() {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM reservation',
            (err, result) => {
                if(err) return reject('Não foi possivel listar as reservas.')
                return resolve(result);
            }
            );
        });
    }

    save(reservation) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO reservation (
                    nome,
                    tipo,
                    data_chegada,
                    data_saida,
                    valor
                ) VALUES (?, ?, ?, ?, ?)
            `,
            [
                reservation.nome,
                reservation.tipo,
                reservation.data_chegada,
                reservation.data_saida,
                reservation.valor
            ],
            (err) => {
                if (err) {
                    console.error(err);
                    return reject('Não foi possível fazer a sua reserva.');
                }
                resolve();
            })
        });
    }
}

module.exports = ReservationDao;