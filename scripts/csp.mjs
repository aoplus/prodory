// Post-build: add sha256 hashes of inline executable scripts (Astro island runtime) to the CSP in dist/_headers.
// JSON-LD blocks are data, not executed, so they are skipped.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (name.endsWith('.html')) yield p;
  }
}
const hashes = new Set();
const re = /<script(?![^>]*\ssrc=)(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g;
for (const file of htmlFiles(dist)) {
  for (const m of readFileSync(file, 'utf8').matchAll(re)) {
    hashes.add(`'sha256-${createHash('sha256').update(m[1]).digest('base64')}'`);
  }
}
const headersPath = join(dist, '_headers');
const src = readFileSync(headersPath, 'utf8');
if (!src.includes('{{INLINE_HASHES}}')) throw new Error('placeholder missing in _headers');
writeFileSync(headersPath, src.replace('{{INLINE_HASHES}}', [...hashes].join(' ')));
console.log(`csp: ${hashes.size} inline script hash(es) added`);
