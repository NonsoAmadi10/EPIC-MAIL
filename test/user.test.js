import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import app from '../src/index';
import testData from './seed/dummy.seed.data';

chai.use(chaiHttp);

describe('Users', () => {
 
  it('should not allow user to create an account using an invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Jaycee', lastName: 'Amadi', password: 'sgfsgssgs', email: 'ahgsgshshs',
      })
      .end((_err, res) => {
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(400);
        expect(res.body).to.haveOwnProperty('error');
        expect(res.body.error).to.equal('invalid email');
        done();
      });
  });

  it('should not allow user to create an account using a firstname less than or equal to one character', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'a', lastName: 'Amadi', password: 'sgafsshs', email: 'amadi@epic.com',
      })
      .end((_err, res) => {
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(400);
        expect(res.body).to.haveOwnProperty('error');
        expect(res.body.error).to.equal('firstname must be atleast two characters long');
        done();
      });
  });

  it('should not allow user to create an account using a lastname less than or equal to one character', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'amadi', lastName: 'a', password: 'agsgs', email: 'amadi@epic.com',
      })
      .end((_err, res) => {
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(400);
        expect(res.body).to.haveOwnProperty('error');
        expect(res.body.error).to.equal('lastname must be atleast two characters long');
        done();
      });
  });

  it('should not allow a user to create an account using a password less than five characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'amadi', lastName: 'jaycee', password: '12', email: 'amadi@epic.com',
      })
      .end((_err, res) => {
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(400);
        expect(res.body).to.haveOwnProperty('error');
        expect(res.body.error).to.equal('password must be greater than five letters');
        done();
      });
  });

  it('should allow a user to create an account using correct credentials', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(testData.validUser)
      .end((_err, res) => {
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(201);
        expect(res.body).to.haveOwnProperty('token');
        done();
      });
  });

  it('should not allow a user to login with an empty input field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: '',
        password: '',
      })
      .end((_err, res) => {
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(400);
        expect(res.body).to.haveOwnProperty('error');
        expect(res.body.error).to.equal('email cannot be empty');
        done();
      });
  });

  it('should not allow a user that is not registered to login', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'kayode@gmail', password: 'dgdgdhdhdjj' })
      .end((err, res) => {
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(400);
        expect(res.body).to.haveOwnProperty('error');
        expect(res.body.error).to.equal('invalid email');
        done();
      });
  });
 /* it('should allow a user login successfully', (done) => {
    chai.request(app)
    .post('/api/v1/auth/login')
    .send({email: 'xyz10@gamil.com', password: 'xyzyz'})
    .end((err, res) => {
      expect(res.body).to.haveOwnProperty('status');
      expect(res.body.status).to.equal(200);
      expect(res.body).to.haveOwnProperty('token');
      done();
    })
  }) */
});
