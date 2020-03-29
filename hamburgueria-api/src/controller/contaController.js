/**
 * controller/contaController
 */

 import mongoose from 'mongoose';
 import { Router } from 'express';
 import Conta from '../model/conta';
 import bodyParser from 'body-parser';
 import password from 'passport';
 import config from '../config/';
 import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';

 export default ({ config, db }) =>{
     let api = Router();
     //GET retorna usuario http://localhost:4000/v1/conta
     api.get('/', (req, res)=>{
        res.status(200).send({user: req.user});
     });
     api.post('/cadastrar', (req, res)=>{
         Conta.register(new Conta({username: req.body.email}), req.body.senha, (error)=>{
             if(error){
                 return res.status(500).send('Ocorreu um erro.. ' + error);
             }
             password.authenticate(
                 'local',{
                     session: false
                 })(req, res,()=>{
                     res.status(200).send('Usuario cadastrado com sucesso');
                 })
         })
     })
     //3 POST http://localhost:4000/v1/conta/login
     api.post('/login', password.authenticate(
         'local',{
             session: false,
             scope: []
         }), generateAccessToken, respond);

         //4 logout http://localhost:4000/conta/logout
         api.get('/logout', authenticate,(req, res)=>{
             req.logout();
             res.status(200).send('voce saiu com sucesso');
         });

         //5 listar usuarios

         api.get('/sobre', authenticate,(req,res)=>{
             res.status(200).json(req.user)
         })
     return api;
 }
















