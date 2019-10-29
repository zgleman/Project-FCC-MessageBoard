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
  
  this.newReply = async function (thread_id, text, delete_password) {
    var reply = { 
            created_on: new Date(),
            text: text,
            delete_password: delete_password,
            reported: false
            } 
    console.log(thread_id);
    var obj = await Thread.findById(thread_id,  function(err, data){
      if (err) console.log(err);
      data.bumped_on = new Date();
      data.replies.push(reply);
      data.save(function(err){});
      
      return data
    });
    if (obj == undefined) {return 'Thread not found'}
    else return obj;
    
    
  }
  
  
  this.deleteReply = async function (thread_id, reply_id, delete_password) {
    var obj = await Thread.findById(thread_id, function(err, data){})
    if (obj == undefined) { return 'Thread not found'}
    var location = obj.replies.map((d)=> d._id).indexOf(reply_id);
    console.log(location);
    if (location == -1) {return 'reply not found'}
    if (obj.replies[location].delete_password != delete_password){
        return 'incorrect password';
      }
    if (obj.replies[location].delete_password == delete_password){
      await Thread.findById(thread_id, function(err, data){
        data.replies.splice(location, 1);
        data.save(function(err){});
        console.log(data)
      })
      return 'Success'
    }
    
    
    
  }
  
  this.replyList = async function (thread_id) {
    var list = await Thread.findById(thread_id, function(err, data){});
    return list;
    
   
  }
  
  this.reportReply = async function (thread_id, reply_id) {
    var obj = await Thread.findById(thread_id);
    if (obj == undefined) {return 'Thread not found'}
    var location = obj.replies.map((d)=> d._id).indexOf(reply_id);
    if (location == -1) {return 'Reply not found'}
    await Thread.findById(thread_id, function(err, data){
      data.replies[location].reported = true;
      data.save(function(err){});
    })
    return 'Success';
    
  }
}

module.exports = ThreadHandler;
