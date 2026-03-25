'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { formations, FormationKey } from '@/lib/formations';

export interface Player {
  id: string;
  name: string;
  x: number; // 0–100 %
  y: number; // 0–100 %
  role: string;
}

export interface BenchPlayer {
  id: string;
  name: string;
  role: string; // e.g. GK, MF, FW — free text
}

function buildPlayers(formation: FormationKey): Player[] {
  return formations[formation].map((p, i) => ({
    id: `${formation}-${i}`,
    name: p.defaultName,
    x: p.x,
    y: p.y,
    role: p.role,
  }));
}

const DEFAULT_BENCH: BenchPlayer[] = [
  { id: 'b0', name: 'SUB 1', role: 'GK' },
  { id: 'b1', name: 'SUB 2', role: 'DEF' },
  { id: 'b2', name: 'SUB 3', role: 'MID' },
  { id: 'b3', name: 'SUB 4', role: 'MID' },
  { id: 'b4', name: 'SUB 5', role: 'FWD' },
];

interface PitchState {
  formation: FormationKey;
  teamName: string;
  description: string;
  players: Player[];
  bench: BenchPlayer[];

  setFormation: (f: FormationKey) => void;
  setTeamName: (v: string) => void;
  setDescription: (v: string) => void;
  updatePlayer: (id: string, patch: Partial<Pick<Player, 'name' | 'x' | 'y'>>) => void;

  addBenchPlayer: () => void;
  removeBenchPlayer: (id: string) => void;
  updateBenchPlayer: (id: string, patch: Partial<Pick<BenchPlayer, 'name' | 'role'>>) => void;
}

export const usePitchStore = create<PitchState>()(
  persist(
    (set, get) => ({
      formation: '4-4-2',
      teamName: 'Team Name',
      description: 'Explain the tactics.',
      players: buildPlayers('4-4-2'),
      bench: DEFAULT_BENCH,

      setFormation: (formation) =>
        set({ formation, players: buildPlayers(formation) }),

      setTeamName: (teamName) => set({ teamName }),

      setDescription: (description) => set({ description }),

      updatePlayer: (id, patch) =>
        set((state) => ({
          players: state.players.map((p) =>
            p.id === id ? { ...p, ...patch } : p
          ),
        })),

      addBenchPlayer: () => {
        const id = `b${Date.now()}`;
        set((state) => ({
          bench: [...state.bench, { id, name: '', role: 'MID' }],
        }));
      },

      removeBenchPlayer: (id) =>
        set((state) => ({
          bench: state.bench.filter((b) => b.id !== id),
        })),

      updateBenchPlayer: (id, patch) =>
        set((state) => ({
          bench: state.bench.map((b) =>
            b.id === id ? { ...b, ...patch } : b
          ),
        })),
    }),
    { name: 'pitchframe-v1' }
  )
);
