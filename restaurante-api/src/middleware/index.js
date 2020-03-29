/**
 * middleware/index.js
 * Arquivo responsavel por manipular os middlewares da aplicacao
 */

 import { Router } from 'express';
 export default({config, db})=>{
     let api = Router();
     return api;
 }