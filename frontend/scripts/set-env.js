const fs = require('fs');
const path = require('path');

const apiKey = process.env.MAP_OF_VIENNA_MAP_API_KEY || '';
const apiUrl = process.env.MAP_OF_VIENNA_API_URL || '';

const envDir = path.join(__dirname, '..', 'src', 'environments');

const files = [
  { name: 'environment.ts', apiBaseUrl: apiUrl || 'http://localhost:8000' },
  { name: 'environment.prod.ts', apiBaseUrl: apiUrl || 'https://api.mapofvienna.com' },
];

fs.mkdirSync(envDir, { recursive: true });

files.forEach(({ name, apiBaseUrl }) => {
  const output = `export const environment = {\n  apiBaseUrl: ${JSON.stringify(apiBaseUrl)},\n  mapApiKey: ${JSON.stringify(apiKey)},\n};\n`;
  fs.writeFileSync(path.join(envDir, name), output, 'utf8');
  console.log(`[set-env] ${name} -> apiBaseUrl=${apiBaseUrl}`);
});

console.log(`[set-env] mapApiKey ${apiKey ? 'configured' : 'not set'}`);