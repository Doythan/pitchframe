'use client';

import { useRef, useCallback } from 'react';
import { usePitchStore, Player } from '@/store/usePitchStore';

function PitchSVG() {
  const line = 'rgba(255,255,255,0.62)';
  const lw = 0.35;
  return (
    <svg
      viewBox="0 0 68 105"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      preserveAspectRatio="none"
    >
      {/* Grass stripes — subtle */}
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x="0" y={i * 13.125} width="68" height="13.125"
          fill={i % 2 === 0 ? '#0c1f09' : '#0e2309'} />
      ))}

      {/* Border */}
      <rect x="2" y="2" width="64" height="101" fill="none" stroke={line} strokeWidth={lw} />

      {/* Halfway line */}
      <line x1="2" y1="52.5" x2="66" y2="52.5" stroke={line} strokeWidth={lw} />

      {/* Centre circle */}
      <circle cx="34" cy="52.5" r="9.15" fill="none" stroke={line} strokeWidth={lw} />
      <circle cx="34" cy="52.5" r="0.55" fill={line} />

      {/* Top penalty area */}
      <rect x="13.84" y="2" width="40.32" height="16.5" fill="none" stroke={line} strokeWidth={lw} />
      {/* Top goal area */}
      <rect x="24.84" y="2" width="18.32" height="5.5" fill="none" stroke={line} strokeWidth={lw} />
      {/* Top goal */}
      <rect x="27.84" y="0.2" width="12.32" height="2" fill="rgba(255,255,255,0.05)" stroke={line} strokeWidth={lw} />
      {/* Top penalty spot */}
      <circle cx="34" cy="13" r="0.55" fill={line} />
      {/* Top penalty arc */}
      <path d="M25.14,18.5 A9.15,9.15,0,0,0,42.86,18.5" fill="none" stroke={line} strokeWidth={lw} />

      {/* Bottom penalty area */}
      <rect x="13.84" y="86.5" width="40.32" height="16.5" fill="none" stroke={line} strokeWidth={lw} />
      {/* Bottom goal area */}
      <rect x="24.84" y="99.5" width="18.32" height="5.5" fill="none" stroke={line} strokeWidth={lw} />
      {/* Bottom goal */}
      <rect x="27.84" y="102.8" width="12.32" height="2" fill="rgba(255,255,255,0.05)" stroke={line} strokeWidth={lw} />
      {/* Bottom penalty spot */}
      <circle cx="34" cy="92" r="0.55" fill={line} />
      {/* Bottom penalty arc */}
      <path d="M25.14,86.5 A9.15,9.15,0,0,1,42.86,86.5" fill="none" stroke={line} strokeWidth={lw} />

      {/* Corner arcs */}
      <path d="M2,5.5 A3.5,3.5,0,0,0,5.5,2" fill="none" stroke={line} strokeWidth={lw} />
      <path d="M62.5,2 A3.5,3.5,0,0,0,66,5.5" fill="none" stroke={line} strokeWidth={lw} />
      <path d="M2,99.5 A3.5,3.5,0,0,1,5.5,103" fill="none" stroke={line} strokeWidth={lw} />
      <path d="M62.5,103 A3.5,3.5,0,0,1,66,99.5" fill="none" stroke={line} strokeWidth={lw} />
    </svg>
  );
}

function PlayerDot({ player, onPointerDown }: {
  player: Player;
  onPointerDown: (e: React.PointerEvent) => void;
}) {
  return (
    <div
      className="player-marker"
      style={{ left: `${player.x}%`, top: `${player.y}%` }}
      onPointerDown={onPointerDown}
    >
      <div style={{
        width: 30,
        height: 30,
        borderRadius: '50%',
        background: 'rgba(8,9,12,0.75)',
        border: '1.5px solid rgba(255,255,255,0.82)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
        backdropFilter: 'blur(2px)',
      }}>
        <span style={{
          fontSize: 7.5,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.3px',
          textTransform: 'uppercase',
        }}>
          {player.role}
        </span>
      </div>
      <div style={{
        marginTop: 3,
        textAlign: 'center',
        fontSize: 9.5,
        fontWeight: 700,
        color: '#fff',
        textShadow: '0 1px 4px rgba(0,0,0,1), 0 0 8px rgba(0,0,0,0.8)',
        whiteSpace: 'nowrap',
        letterSpacing: '0.6px',
        textTransform: 'uppercase',
      }}>
        {player.name}
      </div>
    </div>
  );
}

export default function Pitch() {
  const { players, updatePlayer } = usePitchStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<string | null>(null);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(3, Math.min(97, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(3, Math.min(97, ((e.clientY - rect.top) / rect.height) * 100));
    updatePlayer(dragging.current, { x, y });
  }, [updatePlayer]);

  const onPointerUp = useCallback(() => {
    dragging.current = null;
  }, []);

  const startDrag = useCallback((id: string, e: React.PointerEvent) => {
    e.preventDefault();
    dragging.current = id;
    containerRef.current?.setPointerCapture(e.pointerId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pitch-container"
      style={{ borderRadius: 2, overflow: 'hidden' }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <PitchSVG />
      {players.map((player) => (
        <PlayerDot
          key={player.id}
          player={player}
          onPointerDown={(e) => startDrag(player.id, e)}
        />
      ))}
    </div>
  );
}
