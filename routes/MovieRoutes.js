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
  console.log('router stop');
  Movie.update({_id: req.body.IDofMovieToEdit}, req.body.edittedMovie, function(err, result){
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


// console.log('router check');
router.post('/:id/comment', Auth, function(req, res, next){


  Movie.findOne({_id: req.params.id}, function(err, movieFound){
    var comment = {
      body: req.body.body,
      user: req.payload._id,
      rating: req.body.rating
      };
    if(err) return next(err);
    if(!movieFound) return next(err);
    movieFound.comments.push(comment);
    movieFound.save(function(err, movieSaved){
      res.send(movieSaved);
  console.log(movieSaved);
    });
  });
});

module.exports = router;
