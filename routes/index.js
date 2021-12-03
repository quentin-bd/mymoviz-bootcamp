var express = require('express');
var router = express.Router();
var request = require('sync-request');
const movieModel = require('../models/movies');

// var journeyModel = require('../models/movies');

const apiKey = 'a600db2b0c336b6108d268613ca43708';
const imgBaseUrl = 'https://image.tmdb.org/t/p/w500/'





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/new-movies', async function(req, res, next) {
  let data = request("GET",`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=popularity.desc&include_adult=true&include_video=false&page=1`);
  let result = JSON.parse(data.body);
  res.json(result)
})


router.post('/wishlist-movie', async function(req, res, next) {
  var newMovie = new movieModel({
    title: req.body.movieName,
    poster: req.body.moviePoster
  })
  
  var savedMovie = await newMovie.save();
  console.log(savedMovie)
  if (savedMovie){

    res.json({result: 'dope'});
  } else {
    res.json({result: 'fuck off'})
  }
})

router.delete('/delete-movie/:title', async function(req, res, next){
  let deletedMovie = await movieModel.deleteOne({ title: req.params.title});
  if (deletedMovie.deletedCount === 0) {
    res.json({result: 'u cant even delete u stupid'})
  } else {
  res.json({result: 'u got rid of that stupid flick'})
}
})

// router.get('/wishlist-movie'), async function(req, res, next) {
//   let wishlist = await movieModel.find();
//   console.log(wishlist)
//   res.json(JSON.parse(wishlist))
// }

router.get('/wishlist-movie', async function(req, res, next) {
  let wishlist = await movieModel.find();
  console.log(wishlist)
  res.json(wishlist)
})

module.exports = router;
