import knex from 'knex'

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_DB_URI
})

export default db
