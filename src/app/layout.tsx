
import { AuthProvider } from '@/app/auth/context/AuthContext';
import './globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workspace App",
  description: "A collaborative workspace application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}