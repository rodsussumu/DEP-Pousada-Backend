const app = require('./src/config/express');

const port = process.env.PORT || 3333

app.listen(port, () => {
    console.log(`Backend rodando na porta ${port}`);
});