const express = require('express');
const config = require('../config');
const consign = require('consign');

const app = express();

// mapeando arquivos
consign()
  .include('src/app/Middlewares')
  .then('src/app/Controllers')
  .into(app);

// iniciando server local  
app.listen(config.port, () => {
  console.log(`[${config.apiName}] está executando na porta: ${config.port}`);
});
