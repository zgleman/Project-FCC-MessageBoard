var mongoose = require('mongoose');
mongoose.connect(process.env.DB, {useNewUrlParser: true});
const shortid = require('shortid');

const Thread = mongoose.model('Thread', {
  board: String,
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

function threadHandler() {
  
  this.create = function (board, text, delete_password) {
    Thread.create({
      board: board,
      text: text,
      created_on: new Date(),
      bumped_on: new Date(),  
      delete_password: delete_password,
      reported: false,
      replies:[]
    }, function (err, data){ 
    if (err) return console.log(err)
    return data});
  }
  
  this.delete = function (thread_id, delete_password) {
    
  }
  
  this.list = function (board) {
    
  }
  
  this.report = function (thread_id) {
    Thread.findByIdAndUpdate
  }
}
