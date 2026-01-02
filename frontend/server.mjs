import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Check if dist exists
const distPath = path.join(__dirname, 'dist');
console.log('📁 Dist path:', distPath);
console.log('📁 Dist exists:', existsSync(distPath));

// Add these before your routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check FIRST - before static files
app.get('/health', (req, res) => {
  console.log('✅ Health check hit');
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files from dist
app.use(express.static(distPath));

// SPA fallback - CHANGED TO app.use() instead of app.get('*')
app.use((req, res) => {
  console.log('📄 Serving index.html for:', req.path);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
  console.log(`🌍 Health: http://0.0.0.0:${PORT}/health`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});