/**
 * model/restaurante.js
 */

 import mongoose from 'mongoose';
 let Schema = mongoose.Schema;

 let RestauranteSchema = new Schema({
     nome: String,
     endereco: String,
     categoria: String,
     telefone: String
 });

 export default mongoose.model('Restaurante', RestauranteSchema);