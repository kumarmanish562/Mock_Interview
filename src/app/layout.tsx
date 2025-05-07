import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { InterviewProvider } from '@/contexts/InterviewContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'AI Mock Interviewer',
  description: 'Practice your interview skills with AI-powered mock interviews and get real-time feedback',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <InterviewProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </InterviewProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}