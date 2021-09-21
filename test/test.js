const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')

let mockedUser = {
    username: "AAA",
    password: '1'
}


describe('Testing /login endpoint', () => {
    it('Respond with 200 HTTP status code and token', (done) => {
        request(app)
        .post('/login')
        .send({
            username: mockedUser.username,
            password: mockedUser.password
        })
        .then(response => {
            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.string;
            done();
        })
        .catch(err => {
            done(err);
        })
    });

    it('Respond with 404 HTTP status code', (done) => {
        request(app)
        .post('/login')
        .send({
            username: "A",
            password: mockedUser.password
        })
        .then(response => {
            expect(response.status).to.be.equal(404);
            expect(response.body).to.be.empty;
            done();
        })
        .catch(err => {
            done(err);
        })
    });

    it('Respond with 401 HTTP status code', (done) => {
        request(app)
        .post('/login')
        .send({
            username: mockedUser.username,
            password: "2"
        })
        .then(response => {
            expect(response.status).to.be.equal(401);
            expect(response.body).to.be.empty;
            done();
        })
        .catch(err => {
            done(err);
        })
    });


    it('Respond with 403 HTTP status code', (done) => {
        request(app)
        .post('/login')
        .send({
            password: "2"
        })
        .then(response => {
            expect(response.status).to.be.equal(403);
            expect(response.text,'error').to.be.equal('Credentials are undefined');
            done();
        })
        .catch(err => {
            done(err);
        })
    });
});




describe('Testing /search/public endpoint', () => {
    it('Respond with 200 HTTP status code and filepaths', (done) => {
        request(app)
        .post('/search/public')
        .send({
            name: 'S',
            extension: 'png',
        })
        .then(response => {
            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.an('array');
            done();
        })     
        .catch(err => {
            done(err);
        })

    })

    it('Respond with 200 HTTP status code and no filepaths', (done) => {
        request(app)
        .post('/search/public')
        .send({
            name: 'S',
            maxSize: 0,
            description: ''
        })
        .then(response => {
            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.an('array').to.have.length(0);
            done();
        })     
        .catch(err => {
            done(err);
        })

    })


    it('Respond with 200 HTTP status code and no filepaths', (done) => {
        request(app)
        .post('/search/public')
        .send({
            name: '*',
            extension: 'png',
            minSize: 100,
            maxSize: 0,
            description: ''
        })
        .then(response => {
            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.an('array');
            done();
        })     
        .catch(err => {
            done(err);
        })

    })


    it('Respond with 200 HTTP status code and filepaths', (done) => {
        request(app)
        .post('/search/public')
        .send({
            minSize: 0,
        })
        .then(response => {
            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.an('array');
            done();
        })     
        .catch(err => {
            done(err);
        })

    })
})


let token = '';

describe('Testing the /search/private endpoint', () => {

    before(async () => {
        let response = await request(app)
        .post('/login')
        .send({
            username: mockedUser.username,
            password: mockedUser.password
        }) 
        .catch(err => {
            done(err);
        })

        token = response.text
    })


    it('Respond with 200 HTTP status code and filepaths', (done) => {
        request(app)
        .post('/search/private')
        .set('Authorization','Bearer '+token)
        .send({
            name: 'S',
        })
        .then(response => {
            expect(response.status).to.be.equal(200);
            done();
        })     
        .catch(err => {
            done(err);
        })

    })


    it('Respond with 200 HTTP status code and filepaths', (done) => {
        request(app)
        .post('/search/private')
        .set('Authorization','Bearer '+token)
        .send({
            extension: 'png',
        })
        .then(response => {
            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.an('array');
            done();
        })     
        .catch(err => {
            done(err);
        })

    })


    it('Respond with 200 HTTP status code and no filepaths', (done) => {
        request(app)
        .post('/search/private')
        .set('Authorization','Bearer '+token)
        .send({
            name: '*',
            extension: 'png',
            minSize: 100,
            maxSize: 0,
            description: ''
        })
        .then(response => {
            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.an('array').to.have.length(0);
            done();
        })     
        .catch(err => {
            done(err);
        })

    })


    it('Respond with 403 HTTP status code', (done) => {
        request(app)
        .post('/search/private')
        .send({
            minSize: 0,
        })
        .then(response => {
            expect(response.status).to.be.equal(403);
            done();
        })     
        .catch(err => {
            done(err);
        })

    })

    it('Respond with 401 HTTP status code', (done) => {
        request(app)
        .post('/search/private')
        .set('Authorization','Bearer ')
        .send({
            minSize: 0,
        })
        .then(response => {
            expect(response.status).to.be.equal(401);
            done();
        })     
        .catch(err => {
            done(err);
        })

    })

})