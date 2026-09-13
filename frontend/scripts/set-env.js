const fs = require('fs');
const path = require('path');

const apiKey = process.env.MAP_OF_VIENNA_MAP_API_KEY || '';

const target = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');

const output = `export const environment = {\n  mapApiKey: ${JSON.stringify(apiKey)},\n};\n`;

fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, output, 'utf8');

console.log(`[set-env] ${apiKey ? 'mapApiKey configured' : 'mapApiKey not set (CARTO basemaps used without a key)'}`);