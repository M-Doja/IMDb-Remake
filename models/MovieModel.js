var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema ({
  title: { required: true, type: String },
  name: { type: String },
  genre: { type: String },
  year: { type: String },
  synopsis: { type: String },
  image: { type: String }
});

mongoose.model('MovieModel', MovieSchema);
