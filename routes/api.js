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
    obj = obj.map(d=>{return {_id: d.id, text: d.text, created_on: d.created_on, bumped_on: d.bumped_on, replies: [d.replies[d.replies.length-3], d.replies[d.replies.length-3], d.replies[d.replies.length-3]]}})
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
  
  app.route('/api/replies/:board');

};
