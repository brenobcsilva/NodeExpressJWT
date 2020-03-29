/**
 * model/hamburgueria.js
 */

 import mongoose from 'mongoose';
 import Avaliacao from './avaliacao';

 let Schema = mongoose.Schema;

 let HamburgueriaSchema = new Schema({
     nome:{
         type: String,
         required: true
     },
     tipoHamburguer: {
         type: String,
         required: true
     },
     preco: Number,
     geometria:{
         type: { type: String, default: 'Ponto'},
         coordinates: [Number]
     },
     avaliacoes: [{
         type: Schema.Types.ObjectId,
         ref: 'Avaliacao'
     }],
     endereco: String,
     telefone: String
 });

 export default mongoose.model('Hamburgueria', HamburgueriaSchema);