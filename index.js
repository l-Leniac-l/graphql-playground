const connect = require('connect');
const bodyParser = require('body-parser');
const { graphqlConnect } = require('graphql-server-express');
const { graphiqlConnect } = require('graphql-server-express');
const http = require('http');

const executableSchema = require('./src/executableSchema');

const PORT = 3000;

const app = connect();

app.use('/graphql', bodyParser.json());
app.use('/graphql', graphqlConnect({schema: executableSchema}));

app.use('/graphiql', graphiqlConnect({endpointURL: '/graphql'}));

http.createServer(app).listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
