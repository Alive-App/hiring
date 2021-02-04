require('dotenv/config');
const app = require('./app');

app.listen(process.env.PORT, process.env.ADDRESS, (err) => {
    if (err) console.log(`Erro ao iniciar servidor ${err}`);
    console.log(`API iniciada no Endereço: ${process.env.ADDRESS} na Porta: ${process.env.PORT}`);
});