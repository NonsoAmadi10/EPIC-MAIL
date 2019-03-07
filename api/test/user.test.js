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
});
