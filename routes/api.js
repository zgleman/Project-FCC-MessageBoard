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
    .get(function(req, res){
    var board = req.params.board;
    var obj = threadHandler.list(board);
    res.json({obj});
  })
  .delete(function(req, res){
    var thread_id = req.body.thread_id;
    var delete_password = req.body.delete_password;
    var answer = threadHandler.delete(thread_id, delete_password);
    res.send(answer);
  })
  .put(function(req, res){
    var thread_id = req.body.thread_id;
    var answer = threadHandler.report(thread_id);
    res.send(answer);
  })
  
  app.route('/api/replies/:board');

};
