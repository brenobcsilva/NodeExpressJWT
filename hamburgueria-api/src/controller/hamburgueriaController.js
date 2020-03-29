/**
 * controller/hamburgueriaController
 */

 import mongoose from 'mongoose';
 import { Router } from 'express';
 import Hamburgueria from '../model/hamburgueria';
 import bodyParser from 'body-parser';
import Avaliacao from '../model/avaliacao'
import { authenticate } from '../middleware/authMiddleware';

 export default({ config, db }) =>{
     let api = Router();
 

 api.post('/adicionarHamburgueria', authenticate,(req, res)=>{
     let novoHamburgueria = new Hamburgueria();

     novoHamburgueria.nome = req.body.nome;
     novoHamburgueria.tipoHamburguer = req.body.tipoHamburguer;
     novoHamburgueria.preco = req.body.preco;
     novoHamburgueria.geometria.coordinates = req.body.geometria.coordinates;
     novoHamburgueria.endereco = req.body.endereco;
     novoHamburgueria.telefone = req.body.telefone; 
     
     novoHamburgueria.save(error =>{
         if(error){
             res.send('Error ao tentar salvar o Hamburgueria' + error);
         }
         res.json({message: 'Hamburgueria adicionado com sucesso'});
     });

 });

 //2 metodo get http://localhost:400/v1/hamburgueria
api.get('/', (req,res)=>{
    Hamburgueria.find({},(error, hamburgueria)=>{
        if(error){
            res.send('Erro ao selecionar o Hamburgueria.. ' + error);
        }
        res.json(hamburgueria);
    })
});

// metodo GET selecionar restaurante por id http://localhost:4000/v1/hamburgueria/:id

api.get('/:id', (req, res)=>{
    Hamburgueria.findById(req.params.id, (error, hamburgueria)=>{
        if(error){
            res.send('Erro ao selecionar o Hamburgueria.. ' + error);
        }
        res.json(hamburgueria);
    })
})

//Metodo put http:localhost:4000/v1/hamburgueria/:id

api.put('/:id', (req, res)=>{
    Hamburgueria.findById(req.params.id, (error, hamburgueria)=>{
        if(error){
            res.send('Erro ao atualizar o Hamburgueria... ' + error);
            
            hamburgueria.nome = req.body.nome;
            hamburgueria.tipoHamburguer = req.body.tipoHamburguer;
            hamburgueria.preco = req.body.preco;
            hamburgueria.geometria.coordinates = req.body.geometria.coordinates;
            hamburgueria.endereco = req.body.endereco;
            hamburgueria.telefone = req.body.telefone; 

            Hamburgueria.save(error=>{
                if(error){
                    res.send('Erro ao tentar atualizar o hamburgueria');
                }
                res.json({message: 'hamburgueria atualizado com sucesso'});
            })
        }
    })
})

//delete http://localhost:4000/v1/hamburgueria

api.delete('/:id', (req, res)=>{
    Hamburgueria.remove({
        _id: req.params.id
    }, (error, hamburgueria)=>{
        if(error){
            res.send('Erro ao tentar excluir o hamburgueria...' + erorr);
        }res.json({message: 'hamburgueria excluido com sucesso!'});
    })
})


//6 Post add uma avaliacao para hamburgueria http://localhost:4000/v1/hamburgueria/avaliacoes/adicionar/:id

api.post('/avaliacoes/adicionar/:id', (req, res)=>{
    Hamburgueria.findById(req.params.id, (error, hamburgueria)=>{
        if(error){
            res.send('Erro ao tentar localizar uma avaliacao da hamburgueria '+ error);
        }
        let novaAvaliacao = new Avaliacao();

        novaAvaliacao.titulo = req.body.titulo;
        novaAvaliacao.pontuacao = req.body.pontuacao;
        novaAvaliacao.texto = req.body.texto;
        novaAvaliacao.nome = req.body.nome;
        novaAvaliacao.hamburgueria = hamburgueria._id

        novaAvaliacao.save(error =>{
            if(error){
                res.send('Erro ' + error);
            }
            hamburgueria.avaliacoes.push(novaAvaliacao);
            hamburgueria.save(error => {
                if(error){
                    res.send('Erro ' + error);
                }
                res.json({message: 'Avaliacao gravada com sucesso!'});
            });
        });
        
    });
});

//http://localhost:4000/v1/hamburgueria/avaliacoes/:id
api.get('/avaliacoes/:id', (req, res)=>{
    Avaliacao.find({hamburgueria: req.params.id}, (error, avaliacoes)=>{
        if(error){
            res.send('Error ' + error);
        }
        res.json(avaliacoes);
    })
})

 return api;
}





