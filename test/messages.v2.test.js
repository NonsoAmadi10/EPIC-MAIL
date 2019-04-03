import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import { expect } from 'chai';
import app from '../src/index';
import { user, generateTokens, messages, createTables } from "./seed/versiontwo.seed";

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
        console.log(result.body);
       expect(result.body).to.haveOwnProperty('status');
       expect(result.body).to.haveOwnProperty('message');
       expect(result.body.message).to.equal('message sent');
       done();
      });
  });
});
