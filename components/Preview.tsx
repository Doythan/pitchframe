'use client';

import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { usePitchStore } from '@/store/usePitchStore';
import Pitch from './Pitch';

export default function Preview() {
  const { teamName, formation, description, bench } = usePitchStore();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `${teamName || 'pitchframe'}-${formation}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
    }
  };

  const filledBench = bench.filter((b) => b.name.trim() !== '');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

      {/* ── THE CARD ── */}
      <div
        ref={cardRef}
        style={{
          width: 420,
          background: '#07090d',
          borderRadius: 0,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.07)',
          fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Gold accent bar */}
        <div style={{ height: 3, background: 'linear-gradient(90deg, #b8962e, #e2c063, #b8962e)' }} />

        {/* Header */}
        <div style={{
          padding: '20px 24px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 26,
              fontWeight: 900,
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              lineHeight: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {teamName || '팀 이름'}
            </div>
            <div style={{
              marginTop: 7,
              fontSize: 10,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.38)',
              textTransform: 'uppercase',
              letterSpacing: '1.8px',
            }}>
              {description || 'FORMATION PREVIEW'}
            </div>
          </div>

          {/* Formation badge */}
          <div style={{
            flexShrink: 0,
            marginLeft: 20,
            border: '1px solid rgba(255,255,255,0.25)',
            padding: '7px 14px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}>
            <div style={{
              fontSize: 9,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}>
              FORMATION
            </div>
            <div style={{
              fontSize: 18,
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '0.5px',
            }}>
              {formation}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />

        {/* Pitch area */}
        <div style={{ padding: '18px 22px', background: 'rgba(0,0,0,0.15)' }}>
          <div style={{ border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
            <Pitch />
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />

        {/* Substitutes */}
        {filledBench.length > 0 && (
          <>
            <div style={{ padding: '14px 24px 12px' }}>
              {/* Label row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 10,
              }}>
                <span style={{
                  fontSize: 8,
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.28)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}>
                  Substitutes
                </span>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
                <span style={{
                  fontSize: 8,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.18)',
                  letterSpacing: '1px',
                }}>
                  {filledBench.length}
                </span>
              </div>

              {/* Player chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {filledBench.map((b) => (
                  <div
                    key={b.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      border: '1px solid rgba(255,255,255,0.12)',
                      padding: '4px 9px 4px 7px',
                      background: 'rgba(255,255,255,0.03)',
                    }}
                  >
                    {/* Position pill */}
                    <span style={{
                      fontSize: 7.5,
                      fontWeight: 800,
                      color: 'rgba(255,255,255,0.35)',
                      letterSpacing: '0.8px',
                      textTransform: 'uppercase',
                      borderRight: '1px solid rgba(255,255,255,0.1)',
                      paddingRight: 6,
                      marginRight: 1,
                    }}>
                      {b.role || '—'}
                    </span>
                    {/* Name */}
                    <span style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.78)',
                      letterSpacing: '0.4px',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}>
                      {b.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />
          </>
        )}

        {/* Footer */}
        <div style={{
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', gap: 16 }}>
            {['GK', 'DEF', 'MID', 'FWD'].map((label) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.4)',
                  background: 'rgba(255,255,255,0.05)',
                }} />
                <span style={{
                  fontSize: 8,
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div style={{
            fontSize: 9,
            fontWeight: 800,
            color: 'rgba(184,150,46,0.5)',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
          }}>
            PITCHFRAME
          </div>
        </div>
      </div>

      {/* Export button */}
      <button
        onClick={handleExport}
        style={{
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.75)',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          padding: '11px 28px',
          cursor: 'pointer',
          transition: 'all 0.15s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
        }}
      >
        Export PNG
      </button>
    </div>
  );
}
