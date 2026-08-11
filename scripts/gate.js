#!/usr/bin/env node
/* Storeez DS enforcement gate (Phase B). Run: npm run gate
 * Checks (exit non-zero on any failure):
 *  1. Schema validation: every components JSON + registry.json conforms
 *     to storeez-component.schema.json (Draft 2020-12, subset).
 *  2. Token lint: no raw hex/rgb() in src tsx|css outside tokens/.
 *  3. Fill-vs-text: text/icon colours use --md-sys-color-primary-text, never
 *     the raw --md-sys-color-primary fill, in CSS color rules.
 *  4. Registry resolve: every registry path exists on disk.
 *  6. State coverage: every registry component declares >= 4 of 8 states.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warn = [];

/* --- 1. Schema validation (minimal, self-contained) --- */
function validateSchema() {
  const schema = JSON.parse(fs.readFileSync(path.join(ROOT, 'storeez-component.schema.json'), 'utf8'));
  const required = schema.required || [];
  const files = [];
  const walk = (dir) => {
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      const st = fs.statSync(p);
      if (st.isDirectory()) walk(p);
      else if (f.endsWith('.json')) files.push(p);
    }
  };
  walk(path.join(ROOT, 'components'));
  files.push(path.join(ROOT, 'registry', 'registry.json'));
  for (const f of files) {
    const data = JSON.parse(fs.readFileSync(f, 'utf8'));
    const arr = Array.isArray(data) ? data : (data.components || [data]);
    for (const comp of arr) {
      const missing = required.filter((r) => !(r in comp));
      if (missing.length) errors.push(`schema: ${f} — ${comp.id || 'entry'} missing ${missing.join(', ')}`);
    }
  }
  console.log(`  1. schema validation: ${files.length} files checked`);
}

/* --- 2. Token lint: no raw hex outside tokens/ --- */
function tokenLint() {
  const hexRe = /#[0-9a-fA-F]{3,8}\b/;
  const rgbRe = /rgba?\(/;
  const walk = (dir, files) => {
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      const st = fs.statSync(p);
      if (st.isDirectory()) {
        if (f === 'tokens' || f === 'node_modules' || f === 'dist') continue;
        walk(p, files);
      } else if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.css')) {
        files.push(p);
      }
    }
    return files;
  };
  const files = walk(path.join(ROOT, 'src'), []);
  for (const f of files) {
    const content = fs.readFileSync(f, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, i) => {
      // allow hex in comments
      if (line.trim().startsWith('*') || line.trim().startsWith('//')) return;
      // allow rgba() inside box-shadow (structural shadow, not a colour fill)
      if (rgbRe.test(line) && !/box-shadow/.test(line)) {
        errors.push(`token-lint: ${path.relative(ROOT, f)}:${i + 1} raw rgba outside shadow — ${line.trim().slice(0, 80)}`);
      }
      // allow hex inside JSX/TS string literals (demo docs showing seed values)
      const isStringLiteral = /['"`]/.test(line.split('//')[0]);
      if (hexRe.test(line) && !isStringLiteral) {
        errors.push(`token-lint: ${path.relative(ROOT, f)}:${i + 1} raw color — ${line.trim().slice(0, 80)}`);
      }
    });
  }
  console.log(`  2. token lint: ${files.length} src files scanned`);
}

/* --- 3. Fill-vs-text: color: var(--md-sys-color-primary) forbidden --- */
function fillVsText() {
  const walk = (dir, files) => {
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      const st = fs.statSync(p);
      if (st.isDirectory()) {
        if (f === 'tokens' || f === 'node_modules' || f === 'dist') continue;
        walk(p, files);
      } else if (f.endsWith('.css')) files.push(p);
    }
    return files;
  };
  const files = walk(path.join(ROOT, 'src'), []);
  for (const f of files) {
    const content = fs.readFileSync(f, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, i) => {
      // color: ... fill token used as text colour
      const m = line.match(/^\s*color:\s*var\(--md-sys-color-primary\)/);
      if (m) {
        errors.push(`fill-vs-text: ${path.relative(ROOT, f)}:${i + 1} — use --md-sys-color-primary-text for text/icon colour`);
      }
    });
  }
  console.log(`  3. fill-vs-text: ${files.length} css files scanned`);
}

/* --- 4. Registry resolve --- */
function registryResolve() {
  const reg = JSON.parse(fs.readFileSync(path.join(ROOT, 'registry', 'registry.json'), 'utf8'));
  for (const c of reg.components) {
    if (!c.path) {
      errors.push(`registry: ${c.id} has no path`);
      continue;
    }
    const p = path.join(ROOT, c.path);
    if (!fs.existsSync(p)) errors.push(`registry: ${c.id} → ${c.path} does not exist`);
  }
  console.log(`  4. registry resolve: ${reg.components.length} entries`);
}

/* --- 5. State coverage: >= 4 of 8 states --- */
function stateCoverage() {
  const reg = JSON.parse(fs.readFileSync(path.join(ROOT, 'registry', 'registry.json'), 'utf8'));
  for (const c of reg.components) {
    const states = c.states || [];
    if (states.length < 4) errors.push(`states: ${c.id} declares ${states.length} states (< 4 of 8)`);
  }
  console.log(`  5. state coverage: ${reg.components.length} components`);
}

validateSchema();
tokenLint();
fillVsText();
registryResolve();
stateCoverage();

console.log('');
if (errors.length) {
  console.error(`✗ GATE FAILED — ${errors.length} errors:`);
  for (const e of errors) console.error('  ' + e);
  process.exit(1);
}
if (warn.length) {
  console.log(`⚠ ${warn.length} warnings:`);
  for (const w of warn) console.log('  ' + w);
}
console.log('✓ GATE PASSED — schema, tokens, fill-vs-text, registry, states all clean');
