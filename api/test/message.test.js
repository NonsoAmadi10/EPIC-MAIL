import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import app from '../src/index';

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

});
