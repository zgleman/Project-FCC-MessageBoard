/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
      test('Test Post', function(done){
         chai.request(server)
        .post('/api/threads/test')
        .send({
           text: 'test text to post',
           delete_password: '1234'
         })
        .end(function(err, res){
           assert.equal(res.status, 200);
           assert.equal(res.body[0].text, 'test text to post');
           assert.equal(res.body[0].delete_password, '1234');
           done();
         })
      })
    });
    
    suite('GET', function() {
      test('List of all thread on board', function(done){
        chai.request(server)
        .get('/api/threads/test')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          done();
            }
           )});
    });
    
    suite('DELETE', function() {
      test('Delete with Incorrect Password then Correct Password', function(done){
        chai.request(server)
        .post('/api/threads/test')
        .send({
           text: 'test to delete',
           delete_password: '1234'
         })
        .end(function(err, res){
           assert.equal(res.status, 200);
           assert.equal(res.body[0].text, 'test to delete');
           assert.equal(res.body[0].delete_password, '1234');
             chai.request(server)
            .delete('/api/threads/test')
            .send({thread_id: res.body[0]._id,
              delete_password: '1'})
              .end(function(err, res2){
                assert.equal(res.status, 200);
                assert.equal(res.body, 'incorrect password');
                done();
            }
           )
         })
        });
      test('Delete with Correct Password', function(done){
        chai.request(server)
        .delete('/api/threads/test')
        .send({thread_id: '',
              delete_password: '1'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body, 'incorrect password');
          done();
            }
           )});
    });
    
    suite('PUT', function() {
      
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      
    });
    
    suite('GET', function() {
      
    });
    
    suite('PUT', function() {
      
    });
    
    suite('DELETE', function() {
      
    });
    
  });

});
