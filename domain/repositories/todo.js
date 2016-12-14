const db = require('../../config/database');

const ref = db.ref('/todos');

getTodo = () => {
  return ref.once('value').then(snapshot => {
    return snapshot.val();
  });
}

module.exports = {getTodo};
