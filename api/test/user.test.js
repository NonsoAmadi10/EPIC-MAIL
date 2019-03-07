import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import app from '../src/index';
import testData from './seed/dummy.seed.data';

chai.use(chaiHttp);

describe('Users', () => {
  it('should register a new User', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(testData.validUser)
      .end((err, res) => {
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('token');
        done();
      });
  });
  it('should not register a user on empty input fields ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(testData.invalidSignupUser)
      .end((err, res) => {
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(404);
        expect(res.body).to.haveOwnProperty('message');
        expect(res.body.message).to.equal('empty input fields');
        done();
      });
  });
  it('should allow a user to signin', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'amadi10',
        password: 'xyzxyz',
      })
      .end((err, res) => {
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('token');
        done();
      });
  });
});
