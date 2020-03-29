/**
 * controller/restauranteController
 */

 import mongoose from 'mongoose';
 import { Router } from 'express';
 import Restaurante from '../model/restaurante';
 import bodyParser from 'body-parser'

 export default({ config, db }) =>{
     let api = Router();
 

 api.post('/adicionarRestaurante', (req, res)=>{
     let novoRestaurante = new Restaurante();

     novoRestaurante.nome = req.body.nome;
     novoRestaurante.endereco = req.body.endereco;
     novoRestaurante.categoria = req.body.categoria;
     novoRestaurante.telefone = req.body.telefone;
     
     novoRestaurante.save(error =>{
         if(error){
             res.send('Error ao tentar salvar o restaurante' + error);
         }
         res.json({message: 'Restaurante adicionado com sucesso'});
     });

 });

 //2 metodo get http://localhost:400/v1/restaurante
api.get('/', (req,res)=>{
    Restaurante.find({},(error, restaurante)=>{
        if(error){
            res.send('Erro ao selecionar o restaurante.. ' + error);
        }
        res.json(restaurante);
    })
});

// metodo GET selecionar restaurante por id http://localhost:4000/v1/restaurante/:id

api.get('/:id', (req, res)=>{
    Restaurante.findById(req.params.id, (error, restaurante)=>{
        if(error){
            res.send('Erro ao selecionar o restaurante.. ' + error);
        }
        res.json(restaurante);
    })
})

//Metodo put http:localhost:4000/v1/restaurante/:id

api.put('/:id', (req, res)=>{
    Restaurante.findById(req.params.id, (error, restaurante)=>{
        if(error){
            res.send('Erro ao atualizar o restaurante... ' + error);
            restaurante.nome = req.body.nome;
            restaurante.endereco = req.body.endereco;
            restaurante.categoria = req.body.categoria;
            restaurante.telefone = req.body.telefone;

            restaurante.save(error=>{
                if(error){
                    res.send('Erro ao tentar atualizar o restaurante');
                }
                res.json({message: 'Restaurante atualizado com sucesso'});
            })
        }
    })
})

//delete http://localhost:4000/v1/restaurante

api.delete('/:id', (req, res)=>{
    Restaurante.remove({
        _id: req.params.id
    }, (error, restaurante)=>{
        if(error){
            res.send('Erro ao tentar excluir o restaurante...' + erorr);
        }res.json({message: 'Restaurante excluido com sucesso!'});
    })
})

 return api;
}































