/**
 * routes/index.js
 */

import express from 'express'
import config from '../config';
import middleware from '../middleware';
import inicializacaoBD from '../../db';
import hamburgueria from '../controller/hamburgueriaController';
import conta from '../controller/contaController';

let router = express();

/**
 * Conexao com bd
 */

 inicializacaoBD(db=>{
    router.use(middleware({config, db}));
    router.use('/hamburgueria', hamburgueria({config, db}));
    router.use('/conta', conta({ config, db }));

 });

 export default router; 
 