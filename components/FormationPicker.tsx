'use client';

import { formations, FORMATION_META, FormationKey } from '@/lib/formations';
import { usePitchStore } from '@/store/usePitchStore';

// ── Mini pitch SVG thumbnail ───────────────────────────────────────────────
function MiniPitch({ formationKey }: { formationKey: FormationKey }) {
  const players = formations[formationKey];
  const line = 'rgba(255,255,255,0.38)';
  const lw = 0.7;

  return (
    <svg
      viewBox="0 0 68 105"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: '100%' }}
      preserveAspectRatio="none"
    >
      {/* Field */}
      <rect x="0" y="0" width="68" height="105" fill="#0c1f09" />

      {/* Border */}
      <rect x="1.5" y="1.5" width="65" height="102" fill="none" stroke={line} strokeWidth={lw} />

      {/* Halfway line */}
      <line x1="1.5" y1="52.5" x2="66.5" y2="52.5" stroke={line} strokeWidth={lw} />

      {/* Centre circle */}
      <circle cx="34" cy="52.5" r="9" fill="none" stroke={line} strokeWidth={lw} />

      {/* Top penalty box */}
      <rect x="13.84" y="1.5" width="40.32" height="16.5" fill="none" stroke={line} strokeWidth={lw} />

      {/* Bottom penalty box */}
      <rect x="13.84" y="87" width="40.32" height="16.5" fill="none" stroke={line} strokeWidth={lw} />

      {/* Player dots */}
      {players.map((p, i) => (
        <circle
          key={i}
          cx={(p.x / 100) * 68}
          cy={(p.y / 100) * 105}
          r={3.2}
          fill="rgba(255,255,255,0.88)"
        />
      ))}
    </svg>
  );
}

// ── Single formation card ──────────────────────────────────────────────────
function FormationCard({
  meta,
  active,
  onClick,
}: {
  meta: (typeof FORMATION_META)[number];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        background: active ? 'rgba(184,150,46,0.07)' : 'rgba(255,255,255,0.02)',
        border: active
          ? '1px solid rgba(184,150,46,0.55)'
          : '1px solid rgba(255,255,255,0.07)',
        cursor: 'pointer',
        padding: 0,
        overflow: 'hidden',
        textAlign: 'left',
        position: 'relative',
        transition: 'border-color 0.12s, background 0.12s',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
        }
      }}
    >
      {/* Active indicator strip */}
      {active && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 2,
          height: '100%',
          background: '#b8962e',
        }} />
      )}

      {/* Mini pitch thumbnail */}
      <div style={{
        width: '100%',
        height: 108,
        overflow: 'hidden',
      }}>
        <MiniPitch formationKey={meta.key} />
      </div>

      {/* Label */}
      <div style={{
        padding: '7px 10px 8px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: active ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.25)',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'nowrap' }}>
          <span style={{
            fontSize: 13,
            fontWeight: 800,
            color: active ? '#e2c063' : 'rgba(255,255,255,0.85)',
            letterSpacing: '0.4px',
            whiteSpace: 'nowrap',
          }}>
            {meta.key}
          </span>
          <span style={{
            fontSize: 9,
            fontWeight: 600,
            color: active ? 'rgba(226,192,99,0.6)' : 'rgba(255,255,255,0.28)',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {meta.label}
          </span>
        </div>
        <div style={{
          marginTop: 2,
          fontSize: 9,
          color: 'rgba(255,255,255,0.28)',
          letterSpacing: '0.3px',
        }}>
          {meta.description}
        </div>
      </div>
    </button>
  );
}

// ── Scrollable picker ──────────────────────────────────────────────────────
export default function FormationPicker() {
  const { formation, setFormation } = usePitchStore();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 6,
        maxHeight: 380,
        overflowY: 'auto',
        paddingRight: 2, // room for scrollbar
      }}
    >
      {FORMATION_META.map((meta) => (
        <FormationCard
          key={meta.key}
          meta={meta}
          active={formation === meta.key}
          onClick={() => setFormation(meta.key)}
        />
      ))}
    </div>
  );
}
