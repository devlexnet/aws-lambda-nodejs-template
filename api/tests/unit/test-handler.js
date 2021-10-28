'use strict';

const app = require('../../function.js');
const chai = require('chai');
const expect = chai.expect;

const event = { body: '{"name": "Test name"}' }
var context
describe('Tests index', function () {
    it('verifies successful response', async () => {

        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);
        console.log('\x1b[33m%s\x1b[0m', `Response: ${JSON.stringify(response)}`)

        expect(response).to.be.an('object');
        expect(response.name).to.be.an('string');
        expect(response.age).to.be.a('number');
        expect(response.message).to.be.an('string');

    });
});
