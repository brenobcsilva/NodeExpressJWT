/**
 * Arquivo: index.js
 */

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from './config';
import routes from './routes';

const LocalStategy = require('passport-local').Strategy

/**
 * Aqui vamos importar futuras pastas que vamos criar
 * Config: Pasta de configuração do MongoDB
 * Routes: Pasta para criar rotas do endpoint
 */
 let app = express();
 app.server = http.createServer(app);
 
 /**
  * Middleware
  */

    /**
     * Configuração do Parser (application/json)
     */

     app.use(bodyParser.urlencoded({extended: true}));
     app.use(bodyParser.json());

  /**
   * Configuração Autenticação
   */

   app.use(passport.initialize());
   let conta = require('./model/conta');
   passport.use(new LocalStategy({
     usernameField: 'email',
     passwordField: 'senha'
   },
    conta.authenticate()
   ));

   /**
    * Rotas da api: v1:
    */

    app.use('/v1', routes);
    app.server.listen(config.port);
    console.log(`Aplicaçaõ sendo executada na porta ${app.server.address().port}`);
    
    export default app;

