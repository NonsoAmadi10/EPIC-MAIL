import chai from 'chai';
import 'chai/register-should';
import 'chai/register-expect';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../src/index';
import { user, createTables } from './seed/versiontwo.seed';

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

  it('should succesfully register a user', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(user.validUserThree)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.haveOwnProperty('status');
        res.body.should.haveOwnProperty('token');
        done();
      });
  });

  it('should not  register a user if email exist ', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(user.validUser)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.haveOwnProperty('status');
        res.body.should.haveOwnProperty('error');
        res.body.error.should.equal('email already exist');
        done();
      });
  });

  it('should not register a user on empty firstname fields', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(user.inValidUserEmptyfirstName)
      .end((err, res) => {
        res.status.should.equal(400);
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
        res.body.error.should.equal('lastname cannot be empty');
        done();
      });
  });

  it('should not login a user that does not exist ', (done) => {
    chai.request(app)
      .post('/api/v2/auth/login')
      .send(user.validUserTwo)
      .end((err, res) => {
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('error');
        expect(res.body).to.haveOwnProperty('error');
        expect(res.body.error).to.equal('no user exist kindly register');
        done();
      });
  });

  it('should succesfully login a user', (done) => {
    chai.request(app)
      .post('/api/v2/auth/login')
      .send(user.validUser)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.haveOwnProperty('status');
        res.body.should.haveOwnProperty('token');
        done();
      });
  });
});
