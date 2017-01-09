const {makeExecutableSchema} = require('graphql-tools');
const {merge} = require('lodash');

// Resolver Imports
const personResolver = require('./resolver/personResolver');

// Schema Imports
const personSchema = require('./schema/personSchema');

// Main Resolver
const mainResolver = merge(
  personResolver
);

// Main Schema
const mainSchema = [
  personSchema
];

module.exports = makeExecutableSchema({
  typeDefs: mainSchema,
  resolvers: mainResolver
});
