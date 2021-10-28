FROM public.ecr.aws/lambda/nodejs:14

COPY function.js package.json package-lock.json ./

RUN npm install

# Command can be overwritten by providing a different command in the template directly.
CMD ["function.lambdaHandler"]
