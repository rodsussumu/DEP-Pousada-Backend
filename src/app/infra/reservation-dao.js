class ReservationDao {
    constructor(db){
        this._db = db;
    }

    list() {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM reservation',
            (err, result) => {
                if(err) return reject('Não foi possivel listar as reservas.');
                return resolve(result);
            }
            );
        });
    }

    countTipo(tipo) {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT count(tipo) as quantidade FROM reservation WHERE tipo = ?',
            [tipo],
            (err, result) => {
                if(err) return reject('Não foi possivel listar as reservas.');
                return resolve(result[0]);
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

    delete(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                DELETE 
                FROM reservation 
                WHERE id = ?
            `,
            [ id ],
            (err) => {
                if (err) {
                    console.error(err);
                    return reject('Não foi possível excluir a reserva.');
                }
                resolve();
            })
        });
    }
}

module.exports = ReservationDao;