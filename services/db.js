const db = require('../config/db.config');
const util = require('util');

const query = util.promisify(db.query).bind(db);
module.exports = { query };
