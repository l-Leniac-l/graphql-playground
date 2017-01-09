const admin = require('firebase-admin');

admin.initializeApp({
	databaseURL: 'https://graphql-playground.firebaseio.com/',
	credential: admin.credential.cert('./firebase-auth.json')
});

module.exports = admin.database();
