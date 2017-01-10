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
    createPerson(_, {
      name, age, skills
    }) {
      let snap = {
        name: name,
        age: age || undefined,
        skills: skills || undefined
      };

      let newPerson = ref.push(snap);

      return ref.child(newPerson.key).once('value').then(snapshot => {
        let result = {
          id: newPerson.key,
          name: snapshot.val().name,
          age: snapshot.val().age,
          skills: snapshot.val().skills
        };
        return result;
      });
    },
    updatePerson(_, {
      id, name, age, skills
    }) {
      return ref.child(id).once('value').then(snapshot => {
        let snap = snapshot.val();

        snap.name = name ? name : snap.name;
        snap.age = age ? age : snap.age;
        snap.skills = skills ? skills : snap.skills;

        ref.child(id).update(snap);

        return ref.child(id).once('value').then(snapshot => {
          let result = {
            id: id,
            name: snapshot.val().name,
            age: snapshot.val().age,
            skills: snapshot.val().skills
          };
          return result;
        });
      });
    },
    deletePerson(_, {id}) {
      ref.child(id).remove();
      return id;
    }
  }
}
