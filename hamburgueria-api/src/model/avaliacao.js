import mongoose from 'mongoose';
import Hamburgueria from './hamburgueria';

let Schema = mongoose.Schema;

let AvaliacaoSchema = new Schema({
    titulo:{
        type: String,
        required: true
    },
    pontuacao: {
        type: Number
    },
    texto: String,
    nome: String,
    hamburgueria:{
        type: Schema.Types.ObjectId,
        ref: 'Hamburgueria',
        required: true
    }
});

export default mongoose.model('Avaliacao', AvaliacaoSchema);