const fs = require('fs');
const path = require('path');

const apiKey = process.env.MAP_OF_VIENNA_MAP_API_KEY || '';
const apiUrl = process.env.MAP_OF_VIENNA_API_URL || '';

const envDir = path.join(__dirname, '..', 'src', 'environments');
const generatedDir = path.join(__dirname, '..', 'src', 'generated');

fs.mkdirSync(envDir, { recursive: true });
fs.mkdirSync(generatedDir, { recursive: true });

// API base URL: only overwrite when an override is explicitly provided, so a
// plain local build never clobbers the committed environment files.
if (apiUrl) {
  for (const name of ['environment.ts', 'environment.prod.ts']) {
    const output = `export const environment = {\n  apiBaseUrl: ${JSON.stringify(apiUrl)},\n};\n`;
    fs.writeFileSync(path.join(envDir, name), output, 'utf8');
    console.log(`[set-env] ${name} -> apiBaseUrl=${apiUrl}`);
  }
} else {
  console.log('[set-env] environment files unchanged (no MAP_OF_VIENNA_API_URL set)');
}

// Map API key: only overwrite when a key is provided. Otherwise preserve any
// existing key so a build never erases a previously configured one.
const keyFile = path.join(generatedDir, 'map-api-key.ts');
if (apiKey) {
  fs.writeFileSync(keyFile, `export const MAP_OF_VIENNA_MAP_API_KEY = ${JSON.stringify(apiKey)};\n`, 'utf8');
  console.log('[set-env] map-api-key.ts -> key configured');
} else if (!fs.existsSync(keyFile)) {
  fs.writeFileSync(keyFile, 'export const MAP_OF_VIENNA_MAP_API_KEY = "";\n', 'utf8');
  console.log('[set-env] map-api-key.ts -> empty (no key set)');
} else {
  console.log('[set-env] map-api-key.ts -> unchanged (no MAP_OF_VIENNA_MAP_API_KEY set)');
}
