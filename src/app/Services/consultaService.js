const consultaRepository = require('../Repositories/consultaRepository');

module.exports = {
  login: (cartaoSus) => {
    return new Promise((resolve, reject) => {
      consultaRepository.login(cartaoSus)
        .then(q => {
          return resolve(q);
        })
        .catch(err => {
          console.log(err);
          return reject(err);
        });
    });
  },
  consultasNext: (cartaoSus) => {
    return new Promise((resolve, reject) => {
      consultaRepository.consultasNext(cartaoSus)
        .then(q => {
          if (q.rowsAffected > 0) {
            for (let i = 0; i < q.rowsAffected; i++) {
              q.recordset[i].id = i + 1;
            }
          }
          return resolve(q);
        })
        .catch(err => {
          console.log(err);
          return reject(err);
        })
    })
  },
  consultasPass: (cartaoSus) => {
    return new Promise((resolve, reject) => {
      consultaRepository.consultasPass(cartaoSus)
        .then(q => {
          if (q.rowsAffected > 0) {
            for (let i = 0; i < q.rowsAffected; i++) {
              q.recordset[i].id = i + 1;
            }
          }
          return resolve(q);
        })
        .catch(err => {
          console.log(err);
          return reject(err);
        })
    })
  },
  consultasPassFalse: (cartaoSus) => {
    return new Promise((resolve, reject) => {
      consultaRepository.consultasPassFalse(cartaoSus)
        .then(q => {
          if (q.rowsAffected > 0) {
            for (let i = 0; i < q.rowsAffected; i++) {
              q.recordset[i].id = i + 1;
            }
          }
          return resolve(q);
        })
        .catch(err => {
          console.log(err);
          return reject(err);
        })
    })
  },
  dadosCadastro: () => {
    return new Promise((resolve, reject) => {
      consultaRepository.dadosCadastro()
        .then(q => {
          for (let i = 0; i < q.rowsAffected; i++) {
            q.recordset[i].id = i + 1;
          }
          return resolve(q);
        })
        .catch(err => {
          console.log(err);
          return reject(err);
        })
    })
  },
  motivo: (id) => {
    return new Promise((resolve, reject) => {
      consultaRepository.motivo(id)
        .then(q => {
          for (let i = 0; i < q.rowsAffected; i++) {
            q.recordset[i].id = i + 1;
          }
          return resolve(q);
        })
        .catch(err => {
          console.log(err);
          return reject(err);
        })
    })
  },
  solicitarPreAgendamento: (preAgendamento) => {
    return new Promise((resolve, reject) => {
      consultaRepository.solicitarPreAgendamento(preAgendamento)
      .then(q => {
        return resolve(q);
      })
      .catch(err => {
        console.log(err);
        return reject(err);
      })
    })
  }
}
