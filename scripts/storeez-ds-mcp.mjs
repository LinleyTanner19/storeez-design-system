#!/usr/bin/env node
/**
 * storeez-ds-mcp — zero-dependency MCP server (stdio, JSON-RPC 2.0).
 *
 * Tools (locked by C1 benchmark: hybrid context — JSON index + on-demand contracts):
 *   get_registry()        → slim JSON index (id, category, description)
 *   get_component(id)     → full component.json contract (or markdown prompt)
 *   get_tokens(tier)      → token groups from tokens.json (global|semantic|component)
 *   resolve_pattern(nl)   → best-matching components for a natural-language need
 *   check_states(id)      → state coverage vs the 8-state model
 *   get_theme(brand)      → theme seed + display font from tokens.json
 *
 * Protocol: newline-delimited JSON-RPC 2.0 on stdin; responses on stdout.
 * Tool-gating rule (AGENTS.md): agents resolve components HERE, never rebuild.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REG = JSON.parse(fs.readFileSync(path.join(ROOT, 'registry', 'registry.json'), 'utf8'));
const TOKENS = JSON.parse(fs.readFileSync(path.join(ROOT, 'tokens.json'), 'utf8'));
const COMPS_DIR = path.join(ROOT, 'components');

const TOOLS = {
  get_registry: {
    description: 'Slim component index (id, category, description). Use first to know what exists.',
    params: {},
  },
  get_component: {
    description: 'Full component contract JSON (variants, states, aiPrompt, tokens, a11y, offline).',
    params: { id: 'string' },
  },
  get_tokens: {
    description: 'Token group(s) from the DTCG graph: global | semantic | component. Empty = all.',
    params: { tier: 'string (optional)' },
  },
  resolve_pattern: {
    description: 'Resolve a natural-language need to the best-matching components (keyword scoring over registry).',
    params: { nl: 'string' },
  },
  check_states: {
    description: 'State coverage for a component vs the 8-state model (>= 4 required).',
    params: { id: 'string' },
  },
  get_theme: {
    description: 'Theme entry: brand, seed colour, display font, modes.',
    params: { brand: 'string' },
  },
};

function loadComponent(id) {
  for (const dir of fs.readdirSync(COMPS_DIR)) {
    const p = path.join(COMPS_DIR, dir, `${id}.json`);
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8'));
  }
  return null;
}

function getRegistry() {
  return REG.components.map((c) => ({
    id: c.id,
    category: c.category || 'core',
    description: (c.description || '').slice(0, 120),
  }));
}

function getTokens(tier) {
  const t = TOKENS.tokens || TOKENS;
  if (!tier) return t;
  if (t[tier]) return t[tier];
  return { error: `no tier "${tier}" (have: ${Object.keys(t).join(', ')})` };
}

function resolvePattern(nl) {
  const tokens = nl.toLowerCase().split(/\W+/).filter((w) => w.length > 2);
  const scored = REG.components.map((c) => {
    const hay = [c.id, c.description || '', (c.aiPrompt || ''), (c.category || '')].join(' ').toLowerCase();
    let score = 0;
    for (const t of tokens) if (hay.includes(t)) score++;
    return { id: c.id, category: c.category, score, match: (c.description || '').slice(0, 90) };
  }).filter((s) => s.score > 0).sort((a, b) => b.score - a.score).slice(0, 5);
  return scored.length ? scored : { note: 'no match — check get_registry' };
}

function checkStates(id) {
  const c = loadComponent(id) || REG.components.find((x) => x.id === id);
  if (!c) return { error: `no component "${id}"` };
  const states = c.states || [];
  return { id, states, count: states.length, passes: states.length >= 4, model: '8-state (>=4 required)' };
}

function getTheme(brand) {
  // brand seeds live in the DTCG graph: global.color.brand.<brand>.{dark,light}
  const brands = (TOKENS.global && TOKENS.global.color && TOKENS.global.color.brand) || {};
  const t = brands[brand];
  if (!t) return { error: `no theme "${brand}" (have: ${Object.keys(brands).join(', ')})` };
  const dark = (t.dark && t.dark.$value) || null;
  const light = (t.light && t.light.$value) || null;
  const darkText = (t['dark-text'] && t['dark-text'].$value) || null;
  return { brand, seed: { dark, light }, darkText, modes: ['dark', 'light'] };
}

function handle(req) {
  const { id, method, params = {} } = req;
  if (method === 'initialize') return { jsonrpc: '2.0', id, result: { protocolVersion: '2024-11-05', capabilities: { tools: { listChanged: false } }, serverInfo: { name: 'storeez-ds-mcp', version: '0.1.0' } } };
  if (method === 'tools/list') return { jsonrpc: '2.0', id, result: { tools: Object.entries(TOOLS).map(([name, t]) => ({ name, description: t.description, inputSchema: { type: 'object', properties: t.params } })) } };
  if (method === 'tools/call') {
    const name = params.name;
    const args = params.arguments || {};
    let result;
    switch (name) {
      case 'get_registry': result = getRegistry(); break;
      case 'get_component': result = loadComponent(args.id) || { error: `no component "${args.id}"` }; break;
      case 'get_tokens': result = getTokens(args.tier); break;
      case 'resolve_pattern': result = resolvePattern(args.nl || ''); break;
      case 'check_states': result = checkStates(args.id); break;
      case 'get_theme': result = getTheme(args.brand); break;
      default: return { jsonrpc: '2.0', id, error: { code: -32601, message: `unknown tool: ${name}` } };
    }
    return { jsonrpc: '2.0', id, result: { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] } };
  }
  return { jsonrpc: '2.0', id, error: { code: -32601, message: `unknown method: ${method}` } };
}

let buffer = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  buffer += chunk;
  let idx;
  while ((idx = buffer.indexOf('\n')) >= 0) {
    const line = buffer.slice(0, idx).trim();
    buffer = buffer.slice(idx + 1);
    if (!line) continue;
    try {
      const req = JSON.parse(line);
      const res = handle(req);
      process.stdout.write(JSON.stringify(res) + '\n');
    } catch (e) {
      process.stdout.write(JSON.stringify({ jsonrpc: '2.0', error: { code: -32700, message: `parse error: ${e.message}` } }) + '\n');
    }
  }
});
