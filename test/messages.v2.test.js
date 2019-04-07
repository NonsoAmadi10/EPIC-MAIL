import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import { expect } from 'chai';
import app from '../src/index';
import {user, generateTokens, messages, createTables } from './seed/versiontwo.seed';

chai.use(chaiHttp);
dotenv.config();

process.NODE_ENV = 'test';

describe('Messages', () => {
  before(createTables);

  const { validUser } = user;
  it('should post a message successfully', (done) => {
    chai.request(app)
      .post('/api/v2/messages')
      .set('Authorization', generateTokens(validUser))
      .send(messages.validMessage)
      .end((err, result) => {
        expect(result.body).to.haveOwnProperty('status');
        expect(result.body).to.haveOwnProperty('message');
        expect(result.body.message).to.equal('message sent');
        done();
      });
  });

  it('should get all received messages', (done) => {
    chai.request(app)
      .get('/api/v2/messages/received')
      .set('Authorization', generateTokens(validUser))
      .end((err, result) => {
        console.log(result.body);
        expect(result.status).to.equal(200);
        expect(result.body).to.be.an('object');
        expect(result.body).to.haveOwnProperty('data');
        expect(result.body.data[0]).to.has.keys(['id', 'senderemail', 'subject', 'message', 'createdon']);
        done();
      });
  });

  it('should get all received unread messages', (done) => {
    chai.request(app)
      .get('/api/v2/messages/unread')
      .set('Authorization', generateTokens(validUser))
      .end((err, result) => {
        expect(result.status).to.equal(200);
        expect(result.body).to.be.an('object');
        expect(result.body).to.haveOwnProperty('data');
        expect(result.body.data[0]).to.has.keys(['id', 'senderemail', 'subject', 'message', 'createdon', 'read']);
        done();
      });
  });

});
