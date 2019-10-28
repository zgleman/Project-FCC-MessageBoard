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

function ThreadHandler() {
  
  this.create = function (board, text, delete_password) {
    var newThread = new Thread({
      board: board,
      text: text,
      created_on: new Date(),
      bumped_on: new Date(),  
      delete_password: delete_password,
      reported: false,
      replies:[]
    });
    newThread.save();
        
    return newThread;
    
  }
  
  this.delete = function (thread_id, delete_password) {
    var obj = Thread.findById(thread_id)
    if (obj.delete_password == delete_password) {
      Thread.findByIdAndDelete(thread_id);
      return 'success'
    } else
    return 'incorrect password'
  }
  
  this.list = function (board) {
    var list = Thread.find({board: board}, null, {sort: {bumped_on: -1}, limit: 10});
    
    return list;
    
   
  }
  
  this.report = function (thread_id) {
    Thread.findByIdAndUpdate(thread_id, {reported: true}, function(err, data){
      if (err) console.log(err)
      return 'Success';
    } )
  }
}

module.exports = ThreadHandler;