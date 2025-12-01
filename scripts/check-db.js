const { Client } = require('pg')

async function check() {
  const client = new Client({ connectionString: process.env.DATABASE_URL })
  try {
    await client.connect()
    const res = await client.query('SELECT 1')
    console.log('DB ready:', res.rows)
    await client.end()
    process.exit(0)
  } catch (err) {
    console.error('DB not ready:', err.message || err)
    process.exit(1)
  }
}

check()
