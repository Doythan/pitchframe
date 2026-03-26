'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/hooks/useIsMobile';

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });
const Preview = dynamic(() => import('@/components/Preview'), { ssr: false });

export default function Home() {
  const [editorOpen, setEditorOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <main style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: '#0d0d0d',
      position: 'relative',
    }}>
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={() => setEditorOpen(!editorOpen)}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 50,
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#b8962e',
            border: 'none',
            color: '#000',
            fontSize: 24,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(184,150,46,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          ☰
        </button>
      )}

      {/* Mobile overlay */}
      {isMobile && editorOpen && (
        <div
          onClick={() => setEditorOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
        />
      )}

      {/* Left: Editor */}
      {(!isMobile || editorOpen) && (
        <div
          style={{
            position: isMobile ? 'fixed' : 'relative',
            left: 0,
            top: 0,
            height: '100vh',
            zIndex: 40,
            width: isMobile ? '100%' : 'auto',
          }}
        >
          <Editor />
        </div>
      )}

      {/* Right: Preview */}
      {!isMobile || !editorOpen ? (
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflowY: 'auto',
          padding: '32px 24px',
          width: isMobile ? '100%' : 'auto',
        }}>
          <Preview />
        </div>
      ) : null}
    </main>
  );
}
