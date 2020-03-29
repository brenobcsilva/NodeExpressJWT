/**
 * routes/index.js
 */

import express from 'express'
import config from '../config';
import middleware from '../middleware';
import inicializacaoBD from '../../db';
import restaurante from '../controller/restauranteController';

let router = express();

/**
 * Conexao com bd
 */

 inicializacaoBD(db=>{
    router.use(middleware({config, db}));
    router.use('/restaurante', restaurante({config, db}));

 });

 export default router;