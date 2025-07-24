import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AppSidebar from '@/components/AppSidebar';
import MyNavbar from '@/components/MyNavbar';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';
import { DashboardProvider } from '@/lib/DashboardContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Gena',
  description:
    'Translate your natural language questions into SQL queries to access your customer database.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DashboardProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={defaultOpen}>
              <div className="flex h-screen w-full">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                  <MyNavbar />
                  <main className="flex-1 p-4">{children}</main>
                </div>
              </div>
            </SidebarProvider>
          </ThemeProvider>
        </DashboardProvider>
      </body>
    </html>
  );
}
