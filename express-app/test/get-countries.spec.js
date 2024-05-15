import request from 'supertest'
import assert from 'assert'
import app from '../src/server'

describe('GET /api/countries', function(){
  it('Should respond an array', (done) => {
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

describe('GET /api/countries?prefix=xxx', function(){
  it('should respond a valid array of country', (done) => {
    request(app)
      .get('/api/countries?prefix=Aus')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);

        assert.equal(res.body.includes('Austria'), true);
        done();
      });
  });
});

