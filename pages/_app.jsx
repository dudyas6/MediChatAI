import '@/assets/index.css';
import { Layout } from '@/components/Layout';
import Head from 'next/head';
import { ThemeProvider } from '@/components/Shared/ThemeContext';
import { AuthProvider } from '@/services/auth.service';
import AccessibilityMenu from "@/components/Shared/AccessibilityMenu";
import titleLogo from '@/assets/Logos/specializedServicesLogo.png';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className='text-[#1d4d85] app min-w-[280px] min-h-screen bg-background dark:bg-gray-800'>
        <Layout>
          <AccessibilityMenu />
          <Component {...pageProps} />
        </Layout>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
