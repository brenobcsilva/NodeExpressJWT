/**
 * model/conta
 */

 import mongoose from 'mongoose';
 import passportLocalMongoose from 'passport-local-mongoose';

 let Schema = mongoose.Schema;

 let ContaSchema = new Schema({
     email: String,
     senha: String
 });

 ContaSchema.plugin(passportLocalMongoose);
 module.exports = mongoose.model('Conta', ContaSchema);

