'use client';

import { usePitchStore } from '@/store/usePitchStore';
import FormationPicker from './FormationPicker';

export default function Editor() {
  const {
    teamName, description, players, bench,
    setTeamName, setDescription, updatePlayer,
    addBenchPlayer, removeBenchPlayer, updateBenchPlayer,
  } = usePitchStore();

  return (
    <div style={{
      width: 272,
      minWidth: 272,
      height: '100vh',
      overflowY: 'auto',
      background: '#0b0d11',
      borderRight: '1px solid rgba(255,255,255,0.07)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Wordmark */}
      <div style={{
        padding: '18px 20px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <div style={{ width: 3, height: 16, background: '#b8962e' }} />
        <span style={{
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: '2px',
          color: '#fff',
          textTransform: 'uppercase',
        }}>
          PitchFrame
        </span>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 28 }}>

        {/* Formation */}
        <section>
          <SectionLabel>Formation</SectionLabel>
          <div style={{ marginTop: 10 }}>
            <FormationPicker />
          </div>
        </section>

        {/* Team name */}
        <section>
          <SectionLabel>Team Name</SectionLabel>
          <div style={{ marginTop: 10 }}>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="팀 이름"
            />
          </div>
        </section>

        {/* Description */}
        <section>
          <SectionLabel>Tactics</SectionLabel>
          <div style={{ marginTop: 10 }}>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="전술 설명"
            />
          </div>
        </section>

        {/* Starting XI */}
        <section>
          <SectionLabel>Starting XI</SectionLabel>
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {players.map((player) => (
              <div key={player.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 30,
                  flexShrink: 0,
                  fontSize: 9,
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  textAlign: 'right',
                }}>
                  {player.role}
                </div>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => updatePlayer(player.id, { name: e.target.value })}
                  placeholder={player.role}
                  style={{ fontSize: 13, padding: '5px 10px' }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Bench */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <SectionLabel>Substitutes</SectionLabel>
            <button
              onClick={addBenchPlayer}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.5)',
                fontSize: 13,
                lineHeight: 1,
                padding: '2px 8px',
                cursor: 'pointer',
                letterSpacing: '0',
              }}
              title="선수 추가"
            >
              +
            </button>
          </div>
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {bench.map((b) => (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {/* Role input — compact */}
                <input
                  type="text"
                  value={b.role}
                  onChange={(e) => updateBenchPlayer(b.id, { role: e.target.value })}
                  placeholder="POS"
                  style={{
                    fontSize: 10,
                    padding: '5px 6px',
                    width: 42,
                    flexShrink: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    textAlign: 'center',
                  }}
                />
                {/* Name input */}
                <input
                  type="text"
                  value={b.name}
                  onChange={(e) => updateBenchPlayer(b.id, { name: e.target.value })}
                  placeholder="이름"
                  style={{ fontSize: 13, padding: '5px 10px', flex: 1 }}
                />
                {/* Remove */}
                <button
                  onClick={() => removeBenchPlayer(b.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.25)',
                    fontSize: 14,
                    cursor: 'pointer',
                    padding: '0 2px',
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                  title="삭제"
                >
                  ×
                </button>
              </div>
            ))}
            {bench.length === 0 && (
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', paddingLeft: 4 }}>
                + 버튼으로 선수를 추가하세요
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 9,
      fontWeight: 700,
      color: 'rgba(255,255,255,0.3)',
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
    }}>
      {children}
    </div>
  );
}
