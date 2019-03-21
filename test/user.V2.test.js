import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

process.NODE_ENV = 'test'
import app from '../src/index';
import {user, createTables } from './seed/versiontwo.seed';

dotenv.config();

chai.use(chaiHttp);

before(createTables);

describe('Users', () => {
    it('should succesfully register a user', (done) =>{
        chai.request(app)
        .post('/api/v2/auth/signup')
        .send(user.validUser)
        .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.haveOwnProperty('status');
        res.body.should.haveOwnProperty('token');
        done();
        })
    })
})