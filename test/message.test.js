import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import app from '../src/index';
import testData from './seed/message.seed.data';

chai.use(chaiHttp);

describe('Messages', () => {
  it('should get all unread Messages', (done) => {
    chai.request(app)
      .get('/api/v1/messages/unread')
      .end((_err, res) => {
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.haveOwnProperty('status');
        expect(res.body.data[0].status).to.equal('unread');
        done();
      });
  });
  it('should get all messages received by the user', (done) => {
    chai.request(app)
      .get('/api/v1/messages')
      .end((_err, res) => {
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.haveOwnProperty('status');
        done();
      });
  });
  it('should get all  Messages sent by the user', (done) => {
    chai.request(app)
      .get('/api/v1/messages/sent')
      .end((err, res) => {
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body).to.haveOwnProperty('data');
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.haveOwnProperty('status');
        expect(res.body.data[0].status).to.equal('sent');
        done();
      });
  });

  it('should not get a message record that does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/messages/100')
      .end((err, res) => {
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Bad Request');
        done();
      });
  });
  it('should get a message record that exist', (done) => {
    chai.request(app)
      .get('/api/v1/messages/1')
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
  it('should post messages', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .send(testData.validMessage)
      .end((err, res) => {
        expect(res.body).to.haveOwnProperty('data');
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(201);
        //expect(res.body.data).to.haveOwnProperty('createdOn');
        expect(res.body.data).to.haveOwnProperty('id');
        expect(res.body.data).to.haveOwnProperty('message');
        expect(res.body.data).to.haveOwnProperty('subject');
        expect(res.body.data).to.haveOwnProperty('parentMessageId');
        expect(res.body.data).to.haveOwnProperty('status');
        done();
      });
  });
  it('should not post messages on empty input fields', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .send(testData.invalidMessage)
      .end((err, res) => {
        expect(res.body).to.haveOwnProperty('error');
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(401);
        done();
      });
  });
  it('should delete a message', (done) => {
    chai.request(app)
      .delete('/api/v1/messages/3')
      .end((err, res) => {
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(204);
        expect(res.body).to.haveOwnProperty('message');
        expect(res.body.message).to.equal('message deleted');
        done();
      });
  });

  it('should not delete a message that does not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/messages/100')
      .end((err, res) => {
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(404);
        expect(res.body).to.haveOwnProperty('error');
        expect(res.body.error).to.equal('Invalid ID');
        done();
      });
  });
});
