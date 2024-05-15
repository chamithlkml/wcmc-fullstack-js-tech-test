import request from 'supertest'
import assert from 'assert'
import app from '../src/server'

describe('GET /', function(){
  it('responds a valid json', (done) => {
    request(app)
      .get('/api/countries')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);

        assert.equal(Array.isArray(res.body), true);
        done();
      });
  });
});



