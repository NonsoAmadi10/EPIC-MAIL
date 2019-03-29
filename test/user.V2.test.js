import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../src/index';
import {user, createTables } from './seed/versiontwo.seed';

process.NODE_ENV = 'test';

dotenv.config();

chai.use(chaiHttp);

before(createTables);

describe('Users', () => {
  it('should succesfully register a user', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(user.validUser)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.haveOwnProperty('status');
        res.body.should.haveOwnProperty('token');
        done();
      });
  });

  it('should not register a user on empty firstname fields', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(user.inValidUserEmptyfirstName)
      .end((err, res) => {
        res.status.should.equal(400);
        console.log(res.body);
        res.body.error.should.equal('firstname cannot be empty');
        done();
      });
  });
  it('should not register a user on empty firstname fields', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(user.invalidUserEmptyLastName)
      .end((err, res) => {
        res.status.should.equal(400);
        console.log(res.body);
        res.body.error.should.equal('lastname cannot be empty');
        done();
      });
  });

 /* it('should not login a user that does not exist ', (done) =>{
      chai.request(app)
      .post('/api/v2/auth/login')
      .send()
  })
  */

});
