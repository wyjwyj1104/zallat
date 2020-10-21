var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CoEmissionSchema = new Schema({
  year: {
    type: Number,
    required: true,
    default: 2020,
  },
  state: {
    type: String,
    required: true,
    default: '',
  },
  value: {
    type: Number,
    required: true,
    default: 0,
  }
});

module.exports = mongoose.model('CoEmission', CoEmissionSchema);
