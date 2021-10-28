# lambda-nodejs14.x

This repository contains source code and supporting files for a AWS Lambda function that you can run locally with the SAM CLI (e.g. For dev and test purposes) or deploy to AWS S3 bucket as zipped file, this is done through a circleci pipeline. It includes the following files and folders.

- api - Code for the application's Lambda function.
- events - Invocation events that you can use to invoke the function.
- api/tests - Unit tests for the application code.
- template.yaml - A template that defines the application's AWS resources.
- .circleci - Build and deployment pipline

## Use the SAM CLI to build and test locally

The Serverless Application Model Command Line Interface (SAM CLI) is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To use the SAM CLI, you need the following tools.

- SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- Node.js - [Install Node.js](https://nodejs.org/), including the NPM package management tool.
- Docker - [Install Docker community edition](https://www.docker.com/)

Build your application with the `sam build` command.

```bash
aws-lambda-nodejs-template$ sam build
```

The SAM CLI installs dependencies defined in `api/package.json`, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
aws-lambda-nodejs-template$ sam local invoke LambdaFunction --event events/event.json
```

The SAM CLI can also emulate your application's API. Use the `sam local start-api` to run the API locally on port 3000.

```bash
aws-lambda-nodejs-template$ sam local start-api
aws-lambda-nodejs-template$ curl http://localhost:3000/
```

The SAM CLI reads the application template to determine the API's routes and the functions that they invoke. The `Events` property on each function's definition includes the route and method for each path.

```yaml
Events:
  POST:
    Type: Api
    Properties:
      Path: /api
      Method: POST
```

## Unit tests

Tests are defined in the `api/tests` folder in this project. Use NPM to install the [Mocha test framework](https://mochajs.org/) and run unit tests.

```bash
sam-lamda-github-backup-nodejs$ cd api
api$ npm install
api$ npm run test
```
