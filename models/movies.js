const mongoose = require('mongoose');


var movieSchema = mongoose.Schema({
    title: String,
    poster: String
  });
  
  var movieModel = mongoose.model('movies', movieSchema);

  module.exports = movieModel;
  
  