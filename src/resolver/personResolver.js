const bluebird = require('bluebird');
const db = require('../../config/database');

const ref = db.ref('/person');

module.exports = {
  Query: {
    persons() {
      return ref.once('value').then(snapshot => {
        let snap = snapshot.val();
        let result = [];

        for (var key in snap) {
          result.push({
            id: key,
            name: snap[key].name,
            age: snap[key].age,
            skills: snap[key].skills
          });
        }
        return result;
      });
    },
    person(_, {id}) {
      return ref.child(id).once('value').then(snapshot => {
        let result = {
          id: id,
          name: snapshot.val().name,
          age: snapshot.val().age,
          skills: snapshot.val().skills
        }
        return result;
      });
    }
  },
  Mutation: {
    
  }
}
