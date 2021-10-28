const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        const requestBody = JSON.parse(event.body);
        console.log(event.body)
        const url = `https://api.agify.io/?name=${requestBody.name.replace(/\s+/g, '')}`
        console.info('\x1b[33m%s\x1b[0m', `Calling ${url}`)
        const ret = await axios(url);
        const { name, age, count } = ret.data;
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: `Hi there ${name}! So you want me to guess your age? My guess is ${age}. I have previously been asked to guess this name ${count} times.`,
                name,
                age,
                count
            })
        };
    } catch (err) {
        console.log(err);
        return err;
    }
    return response
};
