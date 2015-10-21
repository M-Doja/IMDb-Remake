var express = require('express');
var mongoose = require('mongoose');
var jwt = require('express-jwt');
var router = express.Router();
var Movie = mongoose.model('MovieModel');


router.post('/',function(req, res, next){
  var movie = new Movie(req.body);
    movie.title = req.body.title;
    movie.genre = req.body.genre;
    movie.year = req.body.year;
    movie.synopsis = req.body.synopsis;
    movie.name = req.body.name;
    movie.image = req.body.image;
  console.log(movie);
  movie.save(function(err, result) {
    if(err) return next(err);
    if(!result) return next("Could not create the object. Please check all fields.");
    res.send(result);
  });
});

router.get('/', function(req, res){
  Movie.find({}, function(err, result){
    if(err) return next(err);
    res.send(result);
  });
});



module.exports = router;
