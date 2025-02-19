const path = require('path');

const paths = {
  preprocessingDir: path.join(__dirname, '..', 'preproccessing'),
  getDatasetPath: (type, file) => path.join(__dirname, '..', 'preproccessing', `${type}_${file}_snapped.csv`)
};

module.exports = paths;