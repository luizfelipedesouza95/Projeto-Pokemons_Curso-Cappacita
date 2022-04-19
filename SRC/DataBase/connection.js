const knex = require('knex');
const configDatabase = require('./knexfile');

const connectionDataBase = knex(configDatabase);

module.exports = { connectionDataBase };