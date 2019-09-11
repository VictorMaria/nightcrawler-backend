import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Testing for reject trip request endpoint', function(){
  this.timeout(15000);
it('manager can reject reject a trip request  if he is logged in and has a valid token', done => {
  (async () => {
    const validInput = {
      email: "alexiwobi@nomad.com",
      password: '123456'
    };
    const data = {
      status :"rejected"
    };
    const tripId = 3;
    const request = chai.request(app).keepOpen();
    let signResponse = await request.post('/api/v1/auth/signin').send(validInput);
    const { token } = signResponse.body.payload;
    const res = await request.patch(`/api/v1/trips/${tripId}/reject`).set('Authorization', `Bearer ${token}`).send(data);
    res.body.should.have.property('success').equal(true);
    done();
  })();
});
it('none manager cannot reject a a trip request', done => {
  (async () => {
    const validInput = {
      email: 'johndoe@nomad.com',
      password: '123456'
    };
    const data = {
      status: 'rejected'
    };

    const tripId = 3;
    const request = chai.request(app).keepOpen();
    let signResponse = await request.post('/api/v1/auth/signin').send(validInput);
    const { token } = signResponse.body.payload;
    const res = await request.patch(`/api/v1/trips/${tripId}/reject`).set('Authorization', `Bearer ${token}`).send(data);
    res.body.should.have.property('success').equal(false)
    done();
  })();
});

it('record not found if request does not exist', done => {
  (async () => {
    const validInput = {
      email: "alexiwobi@nomad.com",
      password: '123456'
    };
    const data = {
      status: "rejected"
    };
    const tripId = 10;
    const request = chai.request(app).keepOpen();
    let signResponse = await request.post('/api/v1/auth/signin').send(validInput);
    const { token } = signResponse.body.payload;
    const res = await request.patch(`/api/v1/trips/${tripId}/reject`).set('Authorization', `Bearer ${token}`).send(data);
    res.body.should.have.property('success').equal(false);
    done();
  })();
});
});