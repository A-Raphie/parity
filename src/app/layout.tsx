import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Parity — Behavioral Equivalence Engine for IBM Bob 2.0 Modernization',
  description:
    'Compilers check syntax. Parity checks truth. Differential behavioral equivalence testing for IBM Bob 2.0 AI code modernizations across 5,000 adversarial boundary vectors.',
  keywords: [
    'IBM Bob 2.0',
    'AI Modernization',
    'Differential Testing',
    'Behavioral Equivalence',
    'COBOL Migration',
    'Model Context Protocol',
    'MCP',
  ],
  authors: [{ name: 'Raphie' }],
  openGraph: {
    title: 'Parity — Behavioral Equivalence Engine for IBM Bob 2.0',
    description: 'Proves IBM Bob 2.0 modern rewrites match legacy mainframe code bit-for-bit.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#090d16] text-[#f8fafc] antialiased selection:bg-[#3b82f6]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
