import 'dotenv/config';
import { getSql, hashPassword, verifyPassword } from './src/lib/db.js';

async function test() {
  try {
    const sql = getSql();
    console.log('--- Database Check ---');
    const users = await sql`SELECT id, username, email, password, is_active, is_admin FROM users`;
    console.log('Users found:', users.length);
    for (const u of users) {
      console.log(`- ${u.username} (ID: ${u.id}, Active: ${u.is_active}, Admin: ${u.is_admin})`);
    }

    const admin = users.find(u => u.username === 'admin');
    if (admin) {
      const passwordToTest = 'Admin@2024!';
      const saltUsed = process.env.PASSWORD_SALT || 'ThesisForge_Salt_2024';
      console.log('\n--- Admin Login Test ---');
      console.log('Testing password:', passwordToTest);
      console.log('Salt used:', saltUsed);
      
      const computedHash = await hashPassword(passwordToTest);
      console.log('Computed hash:', computedHash);
      console.log('Stored hash:  ', admin.password);
      
      const isValid = await verifyPassword(passwordToTest, admin.password);
      console.log('Is valid:', isValid);
    } else {
      console.log('Admin user NOT FOUND');
    }
  } catch (err) {
    console.error('Error during test:', err);
  }
}

test();
