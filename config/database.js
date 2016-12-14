const firebase = require('firebase');

firebase.initializeApp({
	databaseURL: 'https://graphql-playground.firebaseio.com/',
	serviceAccount: './firebase-auth.json'
});

const db = firebase.database();

module.exports = db;
