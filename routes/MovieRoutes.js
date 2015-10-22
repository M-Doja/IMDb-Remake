var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Movie = mongoose.model('MovieModel');
var jwt = require('express-jwt');
var Auth = jwt({
  userProperty: 'payload',
  secret: "This_is_MY_secret_Phrase"
});


router.post('/',function(req, res, next){
  var movie = new Movie(req.body);
    // movie.title = req.body.title;
    // movie.genre = req.body.genre;
    // movie.year = req.body.year;
    // movie.synopsis = req.body.synopsis;
    // movie.name = req.body.name;
    // movie.image = req.body.image;
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


router.put('/', function(req, res, next){
  console.log(req.body);
  Movie.update({_id: req.body.IDofMovieToEdit}, req.body.editedmovie, function(err, result){
    if(err) return next(err);
    if(!result) return next(err);
    res.send(result);
  });
});

// Remove movie by ID
router.delete('/:id', function(req, res, next){
  Movie.remove({_id: req.params.id}, function(err, result){
    if(err) return next(err);
    res.send();
  });
});

// Get movie comments by ID
router.get('/:id', function(req, res, next){
  Movie.findOne({_id: req.params.id}, function(err, result){
    if(err) return next(err);
    if(!result) return next(err);
    res.send(result);
  });
});



router.post('/:id/comment', Auth, function(req, res, next){
  console.log('here at router');
  var comment = {
    body: req.body.body,
    user: req.payload._id,
    rating: req.body.rating
    };
  Movie.findOne({_id: req.params.id}, function(err, movie){
    if(err) return next(err);
    if(!result) return next(err);
    movie.comment.push(comment);
    movie.save(function(err, movies){
      res.send(movie);
    });
  });
});

module.exports = router;
