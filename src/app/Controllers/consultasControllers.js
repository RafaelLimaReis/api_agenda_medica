const consultaService = require('../Services/consultaService');

module.exports = (app) => {
  app.get('/v1/authenticate/:cartao', (req, res) => {
    let cartaoSus = req.params.cartao;
    consultaService.login(cartaoSus)
      .then(result => {
        // verificação de timeout
        if (result.code === 'ETIMEOUT') {
          return res.status(408).send({message: 'Request Timeout', error: result.message});
        };

        // analise de dados
        if (result.rowsAffected > 0) {
          return res.status(200).send({message: 'Paciente encontrado', data: result.recordset});
        } else {
          return res.status(404).send({message: 'Nenhum paciente encontrado'});
        }
      })
      .catch(error => {
        console.log(error);
        return res.status(400).send(error);
      });
  });
  app.get('/v1/consultas/futuras/:cartao', (req, res) => {
    let cartaoSus = req.params.cartao;
    consultaService.consultasNext(cartaoSus)
      .then(result => {
        // verificação de timeout
        if (result.code === 'ETIMEOUT') {
          return res.status(408).send({message: 'Request Timeout', error: result.message});
        };

        // analise de dados        
        if (result.rowsAffected > 0) {
          return res.status(200).send({message: 'Consultas encontradas', data: result.recordset});
        } else {
          return res.status(404).send({message: 'Nenhuma consulta encontrada'});
        }
      })
      .catch(error => {
        console.log(error);
        return res.status(400).send(error);
      });
  });
  app.get('/v1/consultas/anteriores/:cartao', (req, res) => {
    let cartaoSus = req.params.cartao;
    consultaService.consultasPass(cartaoSus)
      .then(result => {
        // verificação de timeout
        if (result.code === 'ETIMEOUT') {
          return res.status(408).send({message: 'Request Timeout', error: result.message});
        };

        // analise de dados        
        if (result.rowsAffected > 0) {
          return res.status(200).send({message: 'Consultas encontradas', data: result.recordset});
        } else {
          return res.status(404).send({message: 'Nenhuma consulta encontrada'});
        }
      })
      .catch(error => {
        console.log(error);
        return res.status(400).send(error);
      });
  });
  app.get('/v1/consultas/faltas/:cartao', (req, res) => {
    let cartaoSus = req.params.cartao;
    consultaService.consultasPassFalse(cartaoSus)
      .then(result => {
        // verificação de timeout
        if (result.code === 'ETIMEOUT') {
          return res.status(408).send({message: 'Request Timeout', error: result.message});
        };

        // analise de dados        
        if (result.rowsAffected > 0) {
          return res.status(200).send({message: 'Consultas encontradas', data: result.recordset});
        } else {
          return res.status(404).send({message: 'Nenhuma consulta encontrada'});
        }
      })
      .catch(error => {
        console.log(error);
        return res.status(400).send(error);
      });
  });
}
