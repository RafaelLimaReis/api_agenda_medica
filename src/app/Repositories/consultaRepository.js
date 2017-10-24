const config = require('../../../config');
const sql = require('mssql');

module.exports = {
  login: (cartaoSus) => {
    sql.close();
    return sql.connect(config.db).then(() => {
      return sql.query`select p.nome, p.cartao_sus, b.bairro, r.endereco, p.dt_nasc, p.nr, p.telefone,
      p.celular, p.email, p.dt_ultimaatual, p.mae, p.sexo, p.doador, p.tipo_sangue from pacientes p
      inner join aux_bairro b on (b.cd_bai= p.cod_bairro )
      inner join aux_rua r on (r.cd_rua  = p.cd_rua )
      where p.cartao_sus = ${cartaoSus}`
    }).then(result => {
      return result;
    }).catch(err => {
      console.log(err);
      return err;
    })
  },
  consultasNext: (cartaoSus) => {
    sql.close();
    return sql.connect(config.db).then(() => {
      return sql.query`SELECT x.cartao_sus, CONVERT(VARCHAR(20), x.data_hora_sigs, 111) AS DataAgendamento,
                        CONVERT(VARCHAR(20), x.hora_entrada, 108)   AS HorarioParaPacienteChegar,
                        x.NomeMedico, Especialidade, x.data_hora_sigs as HorarioAgendado, x.nome_unidade
                      FROM (SELECT p.cartao_sus, Data_Hora_SIGS,
                            h.hora_entrada, h.hora_saida, m.nome as nomemedico,
                            e.descricao as especialidade, p.dt_nasc, u.nome_fantasia as nome_unidade
                          FROM Agendamento_Consulta A
                          INNER JOIN Pacientes P ON A.Cod_pac = P.Matricula
                          INNER JOIN unidades u ON (u.codigo = a.cod_ubs)             
                          INNER JOIN Prof_Horario H ON ( A.Cod_Prof = H.Cod_Prof
                                                        AND Datepart(dw, A.Dt_Cons) = H.Dia_Semana
                                                        AND A.Cod_Ubs = H.Cod_Unidade
                                                        AND A.Cod_Espec = H.Cod_AtivProf
                                                        AND H.ATIVO = 'S'
                                                        AND H.Data_Inicial = (SELECT Max(Data_Inicial)
                          FROM   Prof_Horario PH
                           WHERE  PH.Cod_Prof = H.Cod_Prof
                            AND PH.DATA_INICIAL < ( Dateadd(dd, 1, Cast(Cast(Getdate() AS VARCHAR(12)) AS DATETIME)) )
                            AND PH.Dia_Semana = H.Dia_Semana
                            AND PH.Cod_Unidade = H.Cod_Unidade
                            AND PH.Cod_Ativprof = H.Cod_Ativprof
                            AND PH.Ativo = 'S') )
                          INNER JOIN Medico_Espec ME ON ( H.Cod_Prof = ME.Cod_Med
                                                          AND H.Cod_AtivProf = ME.Cod_Espec )
                          INNER JOIN Aux_AtivProf E ON ( ME.Cod_Espec = E.Codigo )
                          INNER JOIN Medicos M ON ( ME.Cod_Med = M.Codigo )
                          WHERE  p.cartao_sus = ${cartaoSus} and a.data_hora_sigs >=  Cast(Cast(Getdate() AS VARCHAR(12)) AS DATETIME)) AS x
                          WHERE  x.cartao_sus = ${cartaoSus}
                          and x.data_hora_sigs >=  Cast(Cast(Getdate() AS VARCHAR(12)) AS DATETIME)
                          ORDER  BY dataagendamento`
    }).then(result => {
      return result;
    }).catch(err => {
      console.log(err);
      return err;
    })
  },
  consultasPass: (cartaoSus) => {
    sql.close();
    return sql.connect(config.db).then(() => {
      return sql.query`
      SELECT x.cartao_sus, CONVERT(VARCHAR(20), x.data_hora_sigs, 111) AS DataAgendamento,      
        CONVERT(VARCHAR(20), x.hora_entrada, 108)   AS HorarioParaPacienteChegar,
        x.NomeMedico, Especialidade, x.data_hora_sigs as HorarioAgendado, x.nome_unidade, x.oc
      FROM (SELECT p.cartao_sus, Data_Hora_SIGS, h.hora_entrada, h.hora_saida, m.nome as nomemedico,
            e.descricao as especialidade, p.dt_nasc, u.nome_fantasia as nome_unidade, a.ordemchegada as oc
            FROM Agendamento_Consulta A      
            INNER JOIN Pacientes P ON A.Cod_pac = P.Matricula
            inner join unidades u on (u.codigo = a.cod_ubs)                   
            INNER JOIN Prof_Horario H ON ( A.Cod_Prof = H.Cod_Prof
                                          AND Datepart(dw, A.Dt_Cons) = H.Dia_Semana
                                          AND A.Cod_Ubs = H.Cod_Unidade
                                          AND A.Cod_Espec = H.Cod_AtivProf
                                          AND H.ATIVO = 'S'
                                          AND H.Data_Inicial = (SELECT Max(Data_Inicial)
                                          FROM   Prof_Horario PH
                                          WHERE  PH.Cod_Prof = H.Cod_Prof
                                            AND PH.DATA_INICIAL < ( Dateadd(dd, 1, Cast(Cast(Getdate() AS VARCHAR(12)) AS DATETIME)) )
                                            AND PH.Dia_Semana = H.Dia_Semana
                                            AND PH.Cod_Unidade = H.Cod_Unidade
                                            AND PH.Cod_Ativprof = H.Cod_Ativprof
                                            AND PH.Ativo = 'S') )
            INNER JOIN Medico_Espec ME ON ( H.Cod_Prof = ME.Cod_Med
                                           AND H.Cod_AtivProf = ME.Cod_Espec )
            INNER JOIN Aux_AtivProf E ON ( ME.Cod_Espec = E.Codigo )
            INNER JOIN Medicos M ON ( ME.Cod_Med = M.Codigo )
            WHERE  p.cartao_sus = ${cartaoSus} and a.data_hora_sigs between Dateadd(dd, -360, Cast(Cast(Getdate() AS VARCHAR(12)) AS DATETIME)) and Cast(Cast(Getdate() AS VARCHAR(12)) AS DATETIME) ) AS x
            WHERE  x.cartao_sus = ${cartaoSus}
              and x.data_hora_sigs between Dateadd(dd, -360, Cast(Cast(Getdate() AS VARCHAR(12)) AS DATETIME)) and Cast(Cast(Getdate() AS VARCHAR(12)) AS DATETIME)
              and oc is not null
            ORDER  BY dataagendamento  desc`
    }).then(result => {
      return result;
    }).catch(err => {
      console.log(err);
      return err;
    })
  },
  consultasPassFalse: (cartaoSus) => {
    sql.close();
    return sql.connect(config.db).then(() => {
      return sql.query`
      SELECT x.cartao_sus, CONVERT(VARCHAR(20), x.data_hora_sigs, 111) AS DataAgendamento,      
        CONVERT(VARCHAR(20), x.hora_entrada, 108)   AS HorarioParaPacienteChegar,
        x.NomeMedico, Especialidade, x.data_hora_sigs as HorarioAgendado, x.nome_unidade, x.oc
      FROM (SELECT p.cartao_sus, Data_Hora_SIGS, h.hora_entrada, h.hora_saida, m.nome as nomemedico,
            e.descricao as especialidade, p.dt_nasc, u.nome_fantasia as nome_unidade, a.ordemchegada as oc
            FROM Agendamento_Consulta A      
            INNER JOIN Pacientes P ON A.Cod_pac = P.Matricula
            inner join unidades u on (u.codigo = a.cod_ubs)                   
            INNER JOIN Prof_Horario H ON ( A.Cod_Prof = H.Cod_Prof
                                          AND Datepart(dw, A.Dt_Cons) = H.Dia_Semana
                                          AND A.Cod_Ubs = H.Cod_Unidade
                                          AND A.Cod_Espec = H.Cod_AtivProf
                                          AND H.ATIVO = 'S'
                                          AND H.Data_Inicial = (SELECT Max(Data_Inicial)
                                          FROM   Prof_Horario PH
                                          WHERE  PH.Cod_Prof = H.Cod_Prof
                                            AND PH.DATA_INICIAL < ( Dateadd(dd, 1, Cast(Cast(Getdate() AS VARCHAR(12)) AS DATETIME)) )
                                            AND PH.Dia_Semana = H.Dia_Semana
                                            AND PH.Cod_Unidade = H.Cod_Unidade
                                            AND PH.Cod_Ativprof = H.Cod_Ativprof
                                            AND PH.Ativo = 'S') )
            INNER JOIN Medico_Espec ME ON ( H.Cod_Prof = ME.Cod_Med
                                           AND H.Cod_AtivProf = ME.Cod_Espec )
            INNER JOIN Aux_AtivProf E ON ( ME.Cod_Espec = E.Codigo )
            INNER JOIN Medicos M ON ( ME.Cod_Med = M.Codigo )
            WHERE  p.cartao_sus = ${cartaoSus} and a.data_hora_sigs between Dateadd(dd, -360, Cast(Cast(Getdate() AS VARCHAR(12)) AS DATETIME)) and Cast(Cast(Getdate() AS VARCHAR(12)) AS DATETIME) ) AS x
            WHERE  x.cartao_sus = ${cartaoSus}
              and x.data_hora_sigs between Dateadd(dd, -360, Cast(Cast(Getdate() AS VARCHAR(12)) AS DATETIME)) and Cast(Cast(Getdate() AS VARCHAR(12)) AS DATETIME)
              and oc is null
            ORDER  BY dataagendamento  desc`
    }).then(result => {
      return result;
    }).catch(err => {
      console.log(err);
      return err;
    })
  }
}
