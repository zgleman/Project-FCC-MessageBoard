/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ThreadHandler = require('../controller/threads.js');


module.exports = function (app) {
  var threadHandler = new ThreadHandler();
  
  
  app.route('/api/threads/:board')
     .post(function(req, res){
    var board = req.params.board;
    var text = req.body.text;
    var delete_password = req.body.delete_password;
    var obj = threadHandler.create(board, text, delete_password);
       
    res.redirect('/api/threads/' + obj.board);
  })
    .get(async function(req, res){
    var board = req.params.board;
    var obj = await threadHandler.list(board);
    obj = await obj.map(d=>{return {_id: d.id, text: d.text, created_on: d.created_on, bumped_on: d.bumped_on, replies: [{_id:d.replies[d.replies.length-3].id,
                                                                                                                   created_on: d.replies[d.replies.length-3].created_on,
                                                                                                                   text: d.replies[d.replies.length-3].text},
                                                                                                                   {_id:d.replies[d.replies.length-2].id,
                                                                                                                   created_on: d.replies[d.replies.length-2].created_on,
                                                                                                                   text: d.replies[d.replies.length-2].text}, 
                                                                                                                   {_id:d.replies[d.replies.length-1].id,
                                                                                                                   created_on: d.replies[d.replies.length-1].created_on,
                                                                                                                   text: d.replies[d.replies.length-1].text}]}});
    
    res.json({obj});
  })
  .delete(async function(req, res){
    var thread_id = req.body.thread_id;
    var delete_password = req.body.delete_password;
    var answer = await threadHandler.delete(thread_id, delete_password);
    console.log(answer);
    res.send(answer);
  })
  .put(async function(req, res){
    var thread_id = req.body.thread_id;
    var answer = await threadHandler.report(thread_id);
    res.send(answer);
  })
  
  app.route('/api/replies/:board')
    .post(function(req, res){
      var board = req.params.board; 
      var text = req.body.text;
      var thread_id = req.body.thread_id;
      var delete_password = req.body.delete_password;
      var obj = threadHandler.newReply(thread_id, text, delete_password)
      
      res.redirect('/api/replies/' + board + '?thread_id=' + thread_id);
    
    })
    
    .get(async function(req, res){
    var board = req.params.board;
    var thread_id = req.query.thread_id;
    var obj = await threadHandler.replyList(thread_id);
    if (obj == null) { res.send('Thread_id not found');
    }
    obj.replies = obj.replies.map((d)=>{return {_id:d._id, created_on: d.created_on, text: d.text}});
     res.json({_id: obj.id, text: obj.text, created_on: obj.created_on, bumped_on: obj.bumped_on, replies: obj.replies});
    
  })
    .delete(async function(req, res){
    var board = req.params.board;
    var thread_id = req.body.thread_id;
    var reply_id = req.body.reply_id;
    var delete_password = req.body.delete_password;
    var obj = await threadHandler.deleteReply(thread_id, reply_id, delete_password);
    res.send(obj);
  })
    .put(function(req, res){
    var thread_id = req.body.thread_id;
    var reply_id = req.body.reply_id;
  })

};
