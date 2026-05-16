import 'dotenv/config';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { serve } from '@hono/node-server';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

// Load app from parent src
import app from '../src/index.js';

const PORT = 3001;

console.log('🚀 ThesisForge AI v2.0 - Local Test Server');
console.log('🌐 URL: http://localhost:' + PORT);

serve({
  fetch: app.fetch,
  port: PORT
}, (info) => {
  console.log('✅ Server started on http://localhost:' + info.port);
});
