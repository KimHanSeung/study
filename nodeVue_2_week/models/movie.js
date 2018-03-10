const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let movieSchema = new Schema({
    name: String,
    year: String,
    director: String,
    poster: String,
    published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('Movie', movieSchema);