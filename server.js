const {adapter} = require('spirit').node;
const route = require('spirit-router');
const todoSchema = require('./domain/entities/todos.ql');

const api = (query) => {
	return todoSchema(query.query).then(res => {
		return res;
	});
}

const app = route.define([
	route.get('/graphql*', ['query'], api)
]);

const http = require('http');

const server = http.createServer(adapter(app));

server.listen(3002, () => {
	console.log('Server started on port 3000');
});
