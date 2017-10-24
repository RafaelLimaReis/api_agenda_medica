### Api - Agendamentos

Api desenvolvida por integrantes do time **Social Health** para consumo de dados na aplicação Ionic [Agenda Médica](https://github.com/RafaelLimaReis/Agenda-saude).

- Dependencias
    - Vpn conectada com Banco de dados / ou banco local
    - Node v8.6.0 (Desenvolvido e testado)
    - NPM v5.3.0 (Desenvolvido e testado)
    - nodemon v1.12 (Desenvolvido e testado) `npm i nodemon -g`
    - Conexão com SQL Server
- Passo a passo
    - Clone o projeto `git clone https://caminhoDoGit`
    - Na pasta do projeto execute (pelo cmd ou bash)
        - `npm install` e aguarde
        - Duplique o arquivo (configExample.js) e renomeie para (config.js)
        - Insira as configurações de:
            - user
            - password
            - server
            - database
        - Para iniciar api execute: `npm run api`
- Duvidas sobre as rotas consulte o arquivo api.pdf na pasta docs
- Possibilidade de importar request para Postman. Arquivo encontrado na docs (Hackaton.postman_collection)
---
- Solução de possiveis erros identificados
    - Port default (8080) em uso
        - Altere a porta no arquivo (config.js)