var mongoose = require('mongoose');
mongoose.connect(process.env.DB, {useNewUrlParser: true});
const shortid = require('shortid');

const thread = mongoose.model('thread', {
  _id: {'type': String,
        'default': shortid.generate},
  text: String,
  created_on: Date,
  bumped_on: Date,  
  delete_password: String,
  reported: Boolean,
  replies:[{_id: {type: String,
                  default: shortid.generate}, 
            created_on: Date,
            text: String,
            delete_password: String,
            reported: Boolean
  }]
});

