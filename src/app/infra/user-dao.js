class UserDao {
    constructor(db){
        this._db = db;
    }

    list() {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM users',
            (err, result) => {
                if(err) return reject('Não foi possivel listar o feedback dos usuários.')
                return resolve(result);
            }
            );
        });
    }

    save(user) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO users (
                    nome,
                    email,
                    mensagem
                ) VALUES (?, ?, ?)
            `,
            [
                user.nome,
                user.email,
                user.mensagem
            ],
            (err) => {
                if (err) {
                    console.error(err);
                    return reject('Não foi possível enviar seu feedback.');
                }
                resolve();
            })
        });
    }
}

module.exports = UserDao;