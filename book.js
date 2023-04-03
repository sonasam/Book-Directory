const mongoose = require('mongoose');
const db = require('../config/db');
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        default:"----"
    },
    num:{
      type:Number,
    },
    author:{
        type:String,
        default:"----"
    }
});
const bookmodel = db.model('books',bookSchema);
module.exports = bookmodel;