var filteration = require('../');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'test',
    password: 'test',
    database: 'bookshelf_filteration'
  }
});

var Bookshelf = require('bookshelf')(knex);

filteration.useMethodFilter(true);
Bookshelf.plugin(filteration.plugin);

exports.Bookshelf = Bookshelf;

exports.createSchema = function() {
	return Bookshelf.knex.schema.dropTableIfExists('user').then(function() {
	  return Bookshelf.knex.schema.createTable('user', function(table) {
	    table.increments('id').primary();
	    table.string('first_name').notNullable();
	    table.string('last_name');
	    table.string('phone');
	    table.string('email').notNullable();
	    table.string('password').notNullable();
	    table.string('avatar');
	    table.boolean('verified').defaultTo(0);
	    table.timestamp('registration_date').defaultTo(Bookshelf.knex.raw('now()'));
	  });
  });
};