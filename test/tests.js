const chai = require('chai');
const assert = chai.assert;
const personSchema = require('../src/schema/personSchema');
const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mockServer
} = require('graphql-tools');

const fixtures = require('./fixtures/person/queries.json');

describe('Query tests', () => {
  it('should get all persons', () => {
    const testQuery = `
      query returnPersons {
        persons {
          id
          name
          age
          skills
        }
      }
    `;

    const mockMap = {
      Person: () => ({
        id: () => 'xyz',
        name: () => 'Lenilson',
        age: () => 21,
        skills: () => ['HTML5', 'CSS3']
      })
    };

    return mockServer(personSchema, mockMap).query(testQuery).then(res => {
      assert.deepEqual(res.data.persons, fixtures.getAllPersons);
    });
  });

  it('should get one person', () => {
    const testQuery = `
      query getBydId {
        person(id: "abc") {
          name
          age
          skills
        }
      }
    `;

    const mockMap = {
      Person: () => ({
        id: () => 'abc',
        name: () => 'Arthur',
        age: () => 25,
        skills: () => ['RUBY', 'PYTHON']
      })
    };

    return mockServer(personSchema, mockMap).query(testQuery).then(res => {
      assert.deepEqual(res.data.person, fixtures.getOnePerson);
    });
  });
});
