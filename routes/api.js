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
    
  })
  
  
  app.route('/api/replies/:board');

};
