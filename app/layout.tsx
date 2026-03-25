import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PitchFrame',
  description: '전술 포메이션 카드 메이커',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
