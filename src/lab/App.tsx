import React, { useState } from 'react';
import { ThemeProvider, useTheme } from '../theme';
import { Button } from '../primitives/Button';
import { Badge } from '../primitives/Badge';
import { Avatar } from '../primitives/Avatar';
import { Divider } from '../primitives/Divider';
import { Card } from '../molecules/Card';
import { ListItem } from '../molecules/ListItem';
import { SearchBar } from '../molecules/SearchBar';
import { DataRow } from '../molecules/DataRow';

import './lab-modern.css';

function TokenSwatch({ label, color, isBorder }: { label: string; color: string; isBorder?: boolean }) {
  return (
    <div className="swatch">
      <div className="swatch-fill" style={{ background: color, border: isBorder ? '1px solid var(--border)' : 'none' }} />
      <span className="swatch-label">{label}</span>
    </div>
  );
}

function ThemeHeader() {
  const { theme, toggle } = useTheme();
  return (
    <header className="lab-header">
      <div className="lab-header-left">
        <h1 className="lab-title">Storeez DS</h1>
        <span className="lab-badge">React Component Library</span>
      </div>
      <div className="lab-header-right">
        <div className="theme-switch">
          <span className={`theme-name ${theme === 'storeez' ? 'active' : ''}`}>Storeez</span>
          <button className="toggle-track" onClick={toggle} aria-label="Toggle theme">
            <span className={`toggle-thumb ${theme === 'kumite' ? 'kumite' : ''}`} />
          </button>
          <span className={`theme-name ${theme === 'kumite' ? 'active' : ''}`}>KUMITE</span>
        </div>
      </div>
    </header>
  );
}

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="ds-section">
      <div className="ds-section-head">
        <h2 className="ds-section-title">{title}</h2>
        {desc && <p className="ds-section-desc">{desc}</p>}
      </div>
      <div className="ds-section-body">{children}</div>
    </section>
  );
}

/* === TOKENS === */
function TokensPanel() {
  const { theme } = useTheme();
  return (
    <Section title="Tokens" desc={`${theme === 'storeez' ? 'Storeez Base — #7B2FBE' : 'KUMITE — #CD2D26'} · M3 tonal palette`}>
      <div className="token-grid">
        <TokenSwatch label="Primary" color="var(--md-sys-color-primary)" />
        <TokenSwatch label="Primary Container" color="var(--md-sys-color-primary-container)" />
        <TokenSwatch label="On Primary" color="var(--md-sys-color-on-primary)" />
        <TokenSwatch label="Secondary" color="var(--md-sys-color-secondary)" />
        <TokenSwatch label="Tertiary" color="var(--md-sys-color-tertiary)" />
        <TokenSwatch label="Surface" color="var(--surface)" isBorder />
        <TokenSwatch label="Elevated" color="var(--surface-elevated)" isBorder />
        <TokenSwatch label="Error" color="var(--error)" />
      </div>
      <Divider label="Typography" />
      <div className="type-wall">
        <span className="display-large">Display Large</span>
        <span className="headline-large">Headline Large</span>
        <span className="headline-medium">Headline Medium</span>
        <span className="title-large">Title Large — Inter medium 22px</span>
        <span className="body-large">Body Large — Inter regular 16px. Built for martial artists in Africa and the Indian Ocean.</span>
        <span className="body-medium">Body Medium — Inter regular 14px. Offline-first. Mobile-money. French + English.</span>
        <span className="label-large">LABEL LARGE — 14px SEMIBOLD</span>
        <span className="mono">Mono: 15-3-0  ·  83%  ·  66kg  ·  W 15 L 3 D 0</span>
      </div>
      <Divider label="Spacing · Shape · Shadow" />
      <div className="demo-row">
        <div className="space-ruler">
          {[4,8,12,16,24,32,48,64].map(s => (
            <div key={s} className="space-block" style={{ width: s }} title={`${s}px`} />
          ))}
        </div>
        <div className="radius-demo">
          {[4,8,12,9999].map(r => (
            <div key={r} className="radius-block" style={{ borderRadius: r === 9999 ? '50%' : r }} />
          ))}
        </div>
        <div className="shadow-demo">
          {['sm','md','lg'].map(s => (
            <div key={s} className={`shadow-block shadow-${s}`}>{s}</div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* === ACTIONS === */
import { FAB } from '../primitives/FAB';
import { IconButton } from '../primitives/IconButton';

function ActionsPanel() {
  const [fabCount, setFabCount] = useState(0);
  return (
    <Section title="Actions" desc="Button · FAB · Icon Button — every variant, every state">
      <div className="comp-group">
        <span className="comp-group-title">Button</span>
        <div className="variant-matrix">
          {(['filled','tonal','elevated','outlined','text'] as const).map(v => (
            <div key={v} className="variant-col">
              <span className="variant-label">{v}</span>
              <Button variant={v} size="md">{v}</Button>
              <Button variant={v} size="md" loading>loading</Button>
              <Button variant={v} size="md" disabled>{v}</Button>
            </div>
          ))}
        </div>
      </div>

      <div className="comp-group">
        <span className="comp-group-title">Button sizes</span>
        <div className="demo-row">
          <Button variant="filled" size="sm">Small</Button>
          <Button variant="filled" size="md">Medium</Button>
          <Button variant="filled" size="lg">Large</Button>
        </div>
      </div>

      <div className="comp-group">
        <span className="comp-group-title">FAB</span>
        <div className="demo-row" style={{ minHeight: 100 }}>
          <FAB variant="small" icon="+" onClick={() => setFabCount(c => c + 1)} />
          <FAB variant="regular" icon="+" />
          <FAB variant="large" icon="+" />
          <FAB variant="extended" icon="+" label="Create Event" />
        </div>
      </div>

      <div className="comp-group">
        <span className="comp-group-title">Icon Button</span>
        <div className="demo-row">
          {(['standard','filled','filled-tonal','outlined'] as const).map(v => (
            <IconButton key={v} variant={v} icon="⚙" />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* === INPUTS === */
import { TextField } from '../primitives/TextField';
import { Chip } from '../primitives/Chip';
import { Switch } from '../primitives/Switch';
import { Slider } from '../primitives/Slider';

function InputsPanel() {
  const [text, setText] = useState('');
  const [sliderVal, setSliderVal] = useState(40);
  const [switchOn, setSwitchOn] = useState(false);
  return (
    <Section title="Inputs & Selection" desc="TextField · Chip · Switch · Slider — with all interaction states">
      <div className="comp-group">
        <span className="comp-group-title">Text Field</span>
        <div className="input-grid">
          <TextField variant="filled" label="Filled" placeholder="Enter name" value={text} onChange={setText} />
          <TextField variant="outlined" label="Outlined" placeholder="Search..." value={text} onChange={setText} />
          <TextField variant="filled" label="With error" value="bad@input" error errorMessage="Invalid email format" />
          <TextField variant="filled" label="Multi-line" multiline placeholder="Write a message..." />
        </div>
      </div>

      <div className="comp-group">
        <span className="comp-group-title">Chips</span>
        <div className="demo-row">
          <Chip variant="assist" icon="🏠">Assist</Chip>
          <Chip variant="filter" selected>Filter</Chip>
          <Chip variant="input" icon="🔍">Muay Thai</Chip>
          <Chip variant="suggestion" dismissible>Suggestion</Chip>
          <Chip variant="filter" disabled>Disabled</Chip>
        </div>
      </div>

      <div className="comp-group">
        <span className="comp-group-title">Switch & Slider</span>
        <div className="demo-row">
          <div className="switch-group">
            <Switch checked={switchOn} onChange={setSwitchOn} />
            <span className="body-medium" style={{ color: 'var(--text-secondary)' }}>{switchOn ? 'On' : 'Off'}</span>
          </div>
          <div className="slider-wrap">
            <Slider value={sliderVal} onChange={setSliderVal} min={0} max={100} />
            <span className="mono" style={{ color: 'var(--text-muted)', fontSize: 11 }}>{sliderVal}%</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* === DISPLAY === */
import { Progress } from '../primitives/Progress';
import { Tooltip } from '../primitives/Tooltip';

function DisplayPanel() {
  return (
    <Section title="Data Display & Feedback" desc="Badge · Avatar · Progress · Snackbar · Tooltip">
      <div className="comp-group">
        <span className="comp-group-title">Badge</span>
        <div className="demo-row">
          <Badge variant="dot" />
          <Badge variant="number" count={12} />
          <Badge variant="number" count={420} maxCount={99} />
          <Badge variant="number" color="error" count={3} />
          <Badge variant="number" color="success" count={1} />
        </div>
      </div>

      <div className="comp-group">
        <span className="comp-group-title">Avatar</span>
        <div className="demo-row">
          <Avatar variant="initials" name="KI" size="sm" />
          <Avatar variant="initials" name="KI" size="md" />
          <Avatar variant="initials" name="KI" size="lg" />
          <Avatar variant="placeholder" size="md" />
        </div>
      </div>

      <div className="comp-group">
        <span className="comp-group-title">Progress</span>
        <div className="progress-stack">
          <Progress variant="linear" value={65} max={100} />
          <Progress variant="linear" />
          <div className="demo-row">
            <Progress variant="circular" value={75} max={100} size="md" />
            <Progress variant="circular" size="md" />
          </div>
        </div>
      </div>

      <div className="comp-group">
        <span className="comp-group-title">Tooltip</span>
        <div className="demo-row">
          <Tooltip content="Record: 15-3-0" position="top">
            <span className="body-medium" style={{ cursor: 'pointer', borderBottom: '1px dashed var(--text-muted)' }}>Hover me</span>
          </Tooltip>
          <Tooltip content="Featherweight · 66kg" position="bottom">
            <span className="body-medium" style={{ cursor: 'pointer', borderBottom: '1px dashed var(--text-muted)' }}>Hover bottom</span>
          </Tooltip>
        </div>
      </div>
    </Section>
  );
}

/* === MOLECULES === */
function MoleculesPanel() {
  const [searchVal, setSearchVal] = useState('');
  const fighters = [
    { initials: 'KI', name: 'Kenzi Ibrahim', meta: 'Muay Thai · 15-3-0' },
    { initials: 'AD', name: 'Amara Diallo', meta: 'Muay Thai · 8-2-0' },
    { initials: 'DO', name: 'David Ochieng', meta: 'MMA · 12-5-1' },
  ];
  return (
    <Section title="Molecules" desc="Card · ListItem · SearchBar · DataRow — composed from primitives">
      <div className="comp-group">
        <span className="comp-group-title">Card</span>
        <div className="demo-row">
          <Card variant="elevated" onClick={() => {}}>
            <div className="body-medium" style={{ fontWeight: 600, marginBottom: 4 }}>Elevated</div>
            <div className="body-small" style={{ color: 'var(--text-secondary)' }}>Hover raises. Clickable.</div>
          </Card>
          <Card variant="filled">
            <div className="body-medium" style={{ fontWeight: 600, marginBottom: 4 }}>Filled</div>
            <div className="body-small" style={{ color: 'var(--text-secondary)' }}>Subtle bg.</div>
          </Card>
          <Card variant="outlined">
            <div className="body-medium" style={{ fontWeight: 600, marginBottom: 4 }}>Outlined</div>
            <div className="body-small" style={{ color: 'var(--text-secondary)' }}>Border only.</div>
          </Card>
        </div>
      </div>

      <div className="comp-group">
        <span className="comp-group-title">ListItem</span>
        <div className="list-demo">
          {fighters.map((f, i) => (
            <ListItem
              key={i}
              leading={<Avatar variant="initials" name={f.initials} size="sm" />}
              title={f.name}
              subtitle={f.meta}
              trailing={<Badge variant="dot" />}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>

      <div className="comp-group">
        <span className="comp-group-title">SearchBar</span>
        <div style={{ maxWidth: 400 }}>
          <SearchBar placeholder="Search fighters, gyms, events..." value={searchVal} onChange={setSearchVal} />
        </div>
      </div>

      <Divider label="Data" />
      <div className="comp-group">
        <div style={{ maxWidth: 320 }}>
          <DataRow label="Record" value="15-3-0" mono />
          <DataRow label="Win Rate" value="83%" mono />
          <DataRow label="Disciplines" value="Muay Thai, BJJ" />
          <DataRow label="Gym" value="Team Hurricane" />
        </div>
      </div>
    </Section>
  );
}

/* === ORGANISMS === */
import { TopAppBar } from '../organisms/TopAppBar';
import { BottomNavigation } from '../organisms/BottomNavigation';

function OrganismsPanel() {
  const [tab, setTab] = useState(0);
  const tabs = [
    { icon: '🧭', label: 'Discover', badgeCount: 4 },
    { icon: '🏋️', label: 'Gym' },
    { icon: '🏆', label: 'Events' },
    { icon: '👤', label: 'Profile' },
  ];
  return (
    <Section title="Organisms" desc="TopAppBar · BottomNavigation · Dialog · Bottom Sheet — app shell">
      <div className="comp-group">
        <span className="comp-group-title">Top App Bar</span>
        <div className="organism-frame">
          <TopAppBar
            title="DISCOVER"
            onBack={() => {}}
            actions={[{ icon: '🔍', onClick: () => {} }, { icon: '🔔', onClick: () => {}, badge: true }]}
          />
        </div>
      </div>

      <div className="comp-group">
        <span className="comp-group-title">Bottom Navigation</span>
        <div className="organism-frame">
          <BottomNavigation tabs={tabs} activeIndex={tab} onTabChange={setTab} />
        </div>
      </div>

      <div className="comp-group">
        <span className="comp-group-title">Dialog & Bottom Sheet</span>
        <div className="demo-row" style={{ alignItems: 'flex-start' }}>
          <Card variant="elevated" style={{ maxWidth: 300 }}>
            <div className="title-medium" style={{ marginBottom: 8 }}>Confirm Removal</div>
            <div className="body-medium" style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
              Remove Kenzi Ibrahim from KUMITE Series 4?
            </div>
            <div className="demo-row" style={{ justifyContent: 'flex-end' }}>
              <Button variant="outlined" size="sm">Cancel</Button>
              <Button variant="filled" size="sm">Remove</Button>
            </div>
          </Card>
          <Card variant="elevated" style={{ maxWidth: 300, alignSelf: 'flex-end', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
            <div style={{ width: 32, height: 4, background: 'var(--border)', borderRadius: 2, margin: '0 auto 12px' }} />
            {['Edit Profile', 'Share Fighter', 'Report Record', 'Block'].map(a => (
              <ListItem key={a} title={a} onClick={() => {}} trailing={<span style={{ color: 'var(--text-muted)' }}>→</span>} />
            ))}
          </Card>
        </div>
      </div>
    </Section>
  );
}

/* === AI PATTERNS === */
function AIPanel() {
  return (
    <Section title="AI Patterns" desc="Storeez-native — AI Overlay · AI Cards · AI Loading · AI Empty">
      <div className="comp-group">
        <span className="comp-group-title">AI Overlay</span>
        <Card variant="filled" style={{ maxWidth: 380 }}>
          <div style={{ width: 36, height: 4, background: 'var(--border)', borderRadius: 2, margin: '0 auto 16px' }} />
          <div className="headline-medium" style={{ marginBottom: 4 }}>How can I help?</div>
          <div className="body-small" style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
            I know you're on Discover. Try:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {[
              { icon: '🔍', text: 'Find fighters in my weight class' },
              { icon: '🎯', text: 'Show upcoming events near me' },
              { icon: '🥋', text: 'Recommend a gym for Muay Thai' },
            ].map(s => (
              <Card key={s.text} variant="outlined" onClick={() => {}}>
                <div className="demo-row">
                  <span>{s.icon}</span>
                  <span className="body-medium">{s.text}</span>
                </div>
              </Card>
            ))}
          </div>
          <SearchBar placeholder="Type your question..." value="" onChange={() => {}} />
        </Card>
      </div>

      <div className="comp-group">
        <span className="comp-group-title">AI Cards</span>
        <div className="ai-cards-row">
          {[
            { icon: '🥊', title: 'Fight Night', sub: 'Events near you' },
            { icon: '🤝', title: 'Similar Fighters', sub: 'Based on your activity' },
            { icon: '🏋️', title: 'New Gyms', sub: 'Recently joined' },
            { icon: '🏆', title: 'Rank Up', sub: 'Your standing' },
          ].map(c => (
            <div key={c.title} className="ai-card-comp" onClick={() => {}}>
              <div className="ai-card-icon">{c.icon}</div>
              <div className="ai-card-title">{c.title}</div>
              <div className="ai-card-sub">{c.sub}</div>
              <div className="ai-card-tag">Powered by KUMITE AI</div>
            </div>
          ))}
        </div>
      </div>

      <div className="comp-group">
        <span className="comp-group-title">AI Loading & Empty State</span>
        <div className="demo-row" style={{ alignItems: 'flex-start' }}>
          <Card variant="filled" style={{ maxWidth: 300 }}>
            <div className="demo-row" style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>🤔</span>
              <div>
                <div className="label-small" style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}>KUMITE AI</div>
                <div className="body-small" style={{ color: 'var(--text-secondary)' }}>Finding fighters...</div>
              </div>
            </div>
            <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
              <div className="progress-indeterminate" />
            </div>
            <div className="body-small" style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
              Searching featherweight fighters in Antananarivo...
            </div>
          </Card>
          <Card variant="filled" style={{ maxWidth: 300 }}>
            <div style={{ fontSize: 28, textAlign: 'center', marginBottom: 8 }}>📭</div>
            <div className="body-medium" style={{ fontWeight: 600, textAlign: 'center', marginBottom: 4 }}>No fighters found</div>
            <div className="body-small" style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: 12 }}>
              Searched: Muay Thai featherweight · Nairobi
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['🔍 Broaden your search', '💡 Check event calendar', '📋 View all fighters'].map(s => (
                <div key={s} className="empty-suggestion" onClick={() => {}}>{s}</div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}

/* === DOMAIN PREVIEW === */
function DomainPanel() {
  const { theme } = useTheme();
  return (
    <Section title="Domain Preview" desc="KUMITE-specific components — FighterCard, EventCard, Scorecard, BeltProgress">
      <div className="comp-group">
        <div className="demo-row" style={{ alignItems: 'flex-start' }}>
          <Card variant="elevated" style={{ maxWidth: 300, width: '100%' }}>
            <div className="demo-row" style={{ marginBottom: 12 }}>
              <Avatar variant="initials" name="KI" size="md" />
              <div>
                <div className="headline-small" style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>KENZI IBRAHIM</div>
                <div className="body-small" style={{ color: 'var(--text-secondary)' }}>🇷🇪 Saint-Denis, Réunion</div>
              </div>
            </div>
            <div className="demo-row" style={{ gap: 16, marginBottom: 8 }}>
              <div><span className="mono" style={{ color: 'var(--success)', fontSize: 18 }}>15</span><span className="label-small" style={{ color: 'var(--text-muted)', display: 'block' }}>WINS</span></div>
              <div><span className="mono" style={{ color: 'var(--error)', fontSize: 18 }}>3</span><span className="label-small" style={{ color: 'var(--text-muted)', display: 'block' }}>LOSS</span></div>
              <div><span className="mono" style={{ color: 'var(--text-secondary)', fontSize: 18 }}>0</span><span className="label-small" style={{ color: 'var(--text-muted)', display: 'block' }}>DRAW</span></div>
            </div>
            <Divider />
            <DataRow label="Gym" value="Team Hurricane" />
            <DataRow label="Weight" value="66kg — Featherweight" mono />
            <div className="demo-row" style={{ marginTop: 8 }}>
              <Button variant="filled" size="sm">View Profile →</Button>
            </div>
          </Card>

          <Card variant="elevated" style={{ maxWidth: 300, width: '100%' }}>
            <div className="label-small" style={{ color: 'var(--warning)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Nov 15 · Madagascar</div>
            <div className="headline-small" style={{ fontFamily: 'var(--font-display)', fontSize: 18, lineHeight: 1.2, marginBottom: 4 }}>KUMITE SERIES 4</div>
            <div className="body-small" style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>📍 Antananarivo, Madagascar</div>
            <div className="demo-row" style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>
              <span>🥊 12 fights</span>
              <span>🏆 4 titles</span>
            </div>
            <div className="demo-row">
              <Button variant="filled" size="sm">Register</Button>
              <Button variant="outlined" size="sm">View Card</Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="comp-group">
        <span className="comp-group-title">Scorecard (judge view)</span>
        <Card variant="filled" style={{ maxWidth: 380 }}>
          <div className="label-small" style={{ color: 'var(--text-muted)', marginBottom: 8 }}>Judge: C. Baptiste</div>
          <div className="scorecard-grid">
            <span className="label-small" style={{ color: 'var(--text-muted)' }}></span>
            <span className="label-small" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>R1</span>
            <span className="label-small" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>R2</span>
            <span className="label-small" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>R3</span>
            <span className="label-small" style={{ textAlign: 'right', color: 'var(--text-muted)' }}>Total</span>
            <span style={{ fontWeight: 500 }}>Kenzi I.</span>
            <span className="mono" style={{ textAlign: 'center' }}>10</span>
            <span className="mono" style={{ textAlign: 'center' }}>9</span>
            <span className="mono" style={{ textAlign: 'center', color: 'var(--success)' }}>10</span>
            <span className="mono" style={{ textAlign: 'right', fontWeight: 600 }}>29</span>
            <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Amara D.</span>
            <span className="mono" style={{ textAlign: 'center' }}>9</span>
            <span className="mono" style={{ textAlign: 'center', color: 'var(--success)' }}>10</span>
            <span className="mono" style={{ textAlign: 'center' }}>9</span>
            <span className="mono" style={{ textAlign: 'right', fontWeight: 600 }}>28</span>
          </div>
          <Divider />
          <div className="demo-row" style={{ justifyContent: 'space-between' }}>
            <div>
              <div className="body-small" style={{ color: 'var(--success)', fontWeight: 600 }}>Winner: Kenzi Ibrahim</div>
              <div className="label-small" style={{ color: 'var(--text-muted)' }}>Unanimous Decision</div>
            </div>
            <Badge variant="number" count={3} color="success" />
          </div>
        </Card>
      </div>

      <div className="comp-group">
        <span className="comp-group-title">BeltProgress</span>
        <Card variant="filled" style={{ maxWidth: 360 }}>
          <div className="demo-row" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
            <span className="body-medium" style={{ fontWeight: 500 }}>White → Blue</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>30%</span>
          </div>
          <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ width: '30%', height: '100%', background: 'var(--kumite-gold, var(--md-sys-color-secondary))', borderRadius: 3 }} />
          </div>
          <div className="body-small" style={{ color: 'var(--text-muted)' }}>
            → 147 days training · 12 classes until next stripe
          </div>
          <div className="body-small" style={{ color: 'var(--text-muted)' }}>
            → Coach: Ravi Kumar
          </div>
        </Card>
      </div>
    </Section>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemeHeader />
      <main className="lab-main">
        <TokensPanel />
        <ActionsPanel />
        <InputsPanel />
        <DisplayPanel />
        <MoleculesPanel />
        <OrganismsPanel />
        <AIPanel />
        <DomainPanel />
      </main>
      <footer className="lab-footer">
        <span>Storeez Design System · React · TypeScript · CSS Modules</span>
        <span>Seed: <span className="mono">#7B2FBE</span> → <span className="mono">#CD2D26</span></span>
      </footer>
    </ThemeProvider>
  );
}
