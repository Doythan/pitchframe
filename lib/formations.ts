export type FormationKey =
  | '4-4-2'
  | '4-3-3'
  | '4-2-3-1'
  | '3-5-2'
  | '4-1-4-1'
  | '3-4-3'
  | '5-3-2'
  | '4-3-2-1';

export interface PlayerTemplate {
  role: string;
  x: number; // 0–100 % (left → right)
  y: number; // 0–100 % (top = opponent goal → bottom = own goal)
  defaultName: string;
}

export interface FormationMeta {
  key: FormationKey;
  label: string;       // short display name
  description: string; // tactical flavor text
}

// ── Formation metadata ─────────────────────────────────────────────────────
export const FORMATION_META: FormationMeta[] = [
  { key: '4-4-2',   label: 'Classic',    description: '균형 잡힌 클래식' },
  { key: '4-3-3',   label: 'Attack',     description: '3선 공격 압박' },
  { key: '4-2-3-1', label: 'Modern',     description: '현대 포메이션' },
  { key: '3-5-2',   label: 'Wing Play',  description: '측면 WB 활용' },
  { key: '4-1-4-1', label: 'Defensive',  description: '단단한 수비 블록' },
  { key: '3-4-3',   label: 'Offensive',  description: '극단적 공격 축구' },
  { key: '5-3-2',   label: 'Fortress',   description: '5백 수비 블록' },
  { key: '4-3-2-1', label: 'Christmas',  description: '크리스마스 트리' },
];

export const FORMATIONS: FormationKey[] = FORMATION_META.map((m) => m.key);

// ── Player coordinates ─────────────────────────────────────────────────────
export const formations: Record<FormationKey, PlayerTemplate[]> = {
  '4-4-2': [
    { role: 'GK',  x: 50, y: 88, defaultName: 'GK' },
    { role: 'DEF', x: 18, y: 73, defaultName: 'LB' },
    { role: 'DEF', x: 38, y: 73, defaultName: 'CB' },
    { role: 'DEF', x: 62, y: 73, defaultName: 'CB' },
    { role: 'DEF', x: 82, y: 73, defaultName: 'RB' },
    { role: 'MID', x: 18, y: 52, defaultName: 'LM' },
    { role: 'MID', x: 38, y: 52, defaultName: 'CM' },
    { role: 'MID', x: 62, y: 52, defaultName: 'CM' },
    { role: 'MID', x: 82, y: 52, defaultName: 'RM' },
    { role: 'FWD', x: 35, y: 28, defaultName: 'ST' },
    { role: 'FWD', x: 65, y: 28, defaultName: 'ST' },
  ],
  '4-3-3': [
    { role: 'GK',  x: 50, y: 88, defaultName: 'GK' },
    { role: 'DEF', x: 18, y: 73, defaultName: 'LB' },
    { role: 'DEF', x: 38, y: 73, defaultName: 'CB' },
    { role: 'DEF', x: 62, y: 73, defaultName: 'CB' },
    { role: 'DEF', x: 82, y: 73, defaultName: 'RB' },
    { role: 'MID', x: 25, y: 52, defaultName: 'CM' },
    { role: 'MID', x: 50, y: 52, defaultName: 'CM' },
    { role: 'MID', x: 75, y: 52, defaultName: 'CM' },
    { role: 'FWD', x: 20, y: 22, defaultName: 'LW' },
    { role: 'FWD', x: 50, y: 18, defaultName: 'ST' },
    { role: 'FWD', x: 80, y: 22, defaultName: 'RW' },
  ],
  '4-2-3-1': [
    { role: 'GK',  x: 50, y: 88, defaultName: 'GK' },
    { role: 'DEF', x: 18, y: 75, defaultName: 'LB' },
    { role: 'DEF', x: 38, y: 75, defaultName: 'CB' },
    { role: 'DEF', x: 62, y: 75, defaultName: 'CB' },
    { role: 'DEF', x: 82, y: 75, defaultName: 'RB' },
    { role: 'MID', x: 35, y: 59, defaultName: 'DM' },
    { role: 'MID', x: 65, y: 59, defaultName: 'DM' },
    { role: 'MID', x: 18, y: 40, defaultName: 'LM' },
    { role: 'MID', x: 50, y: 37, defaultName: 'AM' },
    { role: 'MID', x: 82, y: 40, defaultName: 'RM' },
    { role: 'FWD', x: 50, y: 17, defaultName: 'ST' },
  ],
  '3-5-2': [
    { role: 'GK',  x: 50, y: 88, defaultName: 'GK'  },
    { role: 'DEF', x: 25, y: 74, defaultName: 'CB'  },
    { role: 'DEF', x: 50, y: 74, defaultName: 'CB'  },
    { role: 'DEF', x: 75, y: 74, defaultName: 'CB'  },
    { role: 'MID', x: 10, y: 53, defaultName: 'LWB' },
    { role: 'MID', x: 30, y: 51, defaultName: 'CM'  },
    { role: 'MID', x: 50, y: 48, defaultName: 'CM'  },
    { role: 'MID', x: 70, y: 51, defaultName: 'CM'  },
    { role: 'MID', x: 90, y: 53, defaultName: 'RWB' },
    { role: 'FWD', x: 35, y: 27, defaultName: 'ST'  },
    { role: 'FWD', x: 65, y: 27, defaultName: 'ST'  },
  ],
  '4-1-4-1': [
    { role: 'GK',  x: 50, y: 88, defaultName: 'GK' },
    { role: 'DEF', x: 18, y: 74, defaultName: 'LB' },
    { role: 'DEF', x: 38, y: 74, defaultName: 'CB' },
    { role: 'DEF', x: 62, y: 74, defaultName: 'CB' },
    { role: 'DEF', x: 82, y: 74, defaultName: 'RB' },
    { role: 'MID', x: 50, y: 61, defaultName: 'DM' },
    { role: 'MID', x: 14, y: 46, defaultName: 'LM' },
    { role: 'MID', x: 37, y: 43, defaultName: 'CM' },
    { role: 'MID', x: 63, y: 43, defaultName: 'CM' },
    { role: 'MID', x: 86, y: 46, defaultName: 'RM' },
    { role: 'FWD', x: 50, y: 17, defaultName: 'ST' },
  ],
  '3-4-3': [
    { role: 'GK',  x: 50, y: 88, defaultName: 'GK' },
    { role: 'DEF', x: 25, y: 73, defaultName: 'CB' },
    { role: 'DEF', x: 50, y: 73, defaultName: 'CB' },
    { role: 'DEF', x: 75, y: 73, defaultName: 'CB' },
    { role: 'MID', x: 15, y: 53, defaultName: 'LM' },
    { role: 'MID', x: 38, y: 50, defaultName: 'CM' },
    { role: 'MID', x: 62, y: 50, defaultName: 'CM' },
    { role: 'MID', x: 85, y: 53, defaultName: 'RM' },
    { role: 'FWD', x: 20, y: 22, defaultName: 'LW' },
    { role: 'FWD', x: 50, y: 17, defaultName: 'ST' },
    { role: 'FWD', x: 80, y: 22, defaultName: 'RW' },
  ],
  '5-3-2': [
    { role: 'GK',  x: 50, y: 88, defaultName: 'GK'  },
    { role: 'DEF', x: 10, y: 76, defaultName: 'LWB' },
    { role: 'DEF', x: 28, y: 74, defaultName: 'CB'  },
    { role: 'DEF', x: 50, y: 73, defaultName: 'CB'  },
    { role: 'DEF', x: 72, y: 74, defaultName: 'CB'  },
    { role: 'DEF', x: 90, y: 76, defaultName: 'RWB' },
    { role: 'MID', x: 25, y: 52, defaultName: 'CM'  },
    { role: 'MID', x: 50, y: 49, defaultName: 'CM'  },
    { role: 'MID', x: 75, y: 52, defaultName: 'CM'  },
    { role: 'FWD', x: 35, y: 26, defaultName: 'ST'  },
    { role: 'FWD', x: 65, y: 26, defaultName: 'ST'  },
  ],
  '4-3-2-1': [
    { role: 'GK',  x: 50, y: 88, defaultName: 'GK' },
    { role: 'DEF', x: 18, y: 74, defaultName: 'LB' },
    { role: 'DEF', x: 38, y: 74, defaultName: 'CB' },
    { role: 'DEF', x: 62, y: 74, defaultName: 'CB' },
    { role: 'DEF', x: 82, y: 74, defaultName: 'RB' },
    { role: 'MID', x: 25, y: 57, defaultName: 'CM' },
    { role: 'MID', x: 50, y: 55, defaultName: 'CM' },
    { role: 'MID', x: 75, y: 57, defaultName: 'CM' },
    { role: 'MID', x: 32, y: 38, defaultName: 'AM' },
    { role: 'MID', x: 68, y: 38, defaultName: 'AM' },
    { role: 'FWD', x: 50, y: 17, defaultName: 'ST' },
  ],
};
