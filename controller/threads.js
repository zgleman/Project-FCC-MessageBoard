var mongoose = require('mongoose');
mongoose.connect(process.env.DB, {useNewUrlParser: true});
const shortid = require('shortid');

const thread = mongoose.model('thread', {
  _id: {'type': String,
        'default': shortid.generate},
  board: String,
  thread: String,
  password: String,
  reported: Boolean,
  replies:[{ 
            time: Date,
            message: String
  }]
});

