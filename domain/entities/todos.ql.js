const Schema = require('graph.ql');
const repo = require('../repositories/todo');

const todoSchema = Schema(`
  type Todo {
    name: String
    checked: Boolean
  }

  type Query {
    todo: Todo
  }
`, {
  Query: {
    todo() {
      return repo.getTodo().then(res => {
        return res;
      })
    }
  }
});

module.exports = todoSchema;
