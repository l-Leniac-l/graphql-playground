module.exports = `
  enum SKILL {
    HTML5
    CSS3
    JS
    RUBY
    PYTHON
    DESIGN
    UX
  }

  type Person {
    id: ID
    name: String!
    age: Int
    skills: [SKILL]
  }

  type Query {
    persons: [Person]
    person(id: ID): Person
  }

  type Mutation {
    createPerson(
      name: String!
      age: Int
      skills: [SKILL]
    ): Person

    updatePerson(
      id: ID!
      name: String
      age: Int
      skills: [SKILL]
    ): Person

    deletePerson(
      id: ID!
    ): ID
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
