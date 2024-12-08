import { AuthProvider } from '@/app/auth/context/AuthContext';
import './globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatSphere",
  description: "Connect and collaborate with ChatSphere",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white`} suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}