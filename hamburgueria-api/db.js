import mongoose from 'mongoose';
import config from './src/config';

export default callback => {
    let db = mongoose.connect(config.mongoUrl, { useNewUrlParser: true });
    callback(db);
}