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
  
  
  this.delete = async function (thread_id, delete_password) {
    var obj = await Thread.find({_id: thread_id});
    console.log(obj[0].delete_password == delete_password);
    if (obj == undefined) { return 'Thread_id not found'} else
    if (obj[0].delete_password == delete_password) {
      await Thread.findByIdAndDelete(thread_id, function (err, thread){});
      return 'success';
    } else {
      return 'incorrect password';
    }
    
    
  }
  
  this.list = function (board) {
    var list = Thread.find({board: board}, null, {sort: {bumped_on: -1}, limit: 10});
    
    return list;
    
   
  }
  
  this.report = async function (thread_id) {
    var obj = await Thread.findByIdAndUpdate(thread_id, {reported: true}, function(err, data){})
    if (obj == undefined) {return 'Thread not found'}
    else if (obj.reported == true){return 'Success'}
  }
}

module.exports = ThreadHandler;