'use client';

import dynamic from 'next/dynamic';

// Zustand persist는 client-only이므로 SSR 비활성화
const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });
const Preview = dynamic(() => import('@/components/Preview'), { ssr: false });

export default function Home() {
  return (
    <main style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: '#0d0d0d',
    }}>
      {/* Left: Editor */}
      <Editor />

      {/* Right: Preview */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
        padding: '32px 24px',
      }}>
        <Preview />
      </div>
    </main>
  );
}
