import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve('..', '.env') })
import { neon } from '@neondatabase/serverless'

async function testDb() {
  const url = process.env.POSTGRES_URL
  if (!url) {
    console.error('POSTGRES_URL not set')
    return
  }
  const sql = neon(url)
  try {
    console.log('Testing connection...')
    const users = await sql`SELECT id, username, email, is_active FROM users`
    console.log('Users found:', users)
    
    const sessions = await sql`SELECT * FROM sessions LIMIT 5`
    console.log('Recent sessions:', sessions)
  } catch (err) {
    console.error('Database error:', err)
  }
}

testDb()
