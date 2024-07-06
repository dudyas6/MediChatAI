import '@/assets/index.css';
import { Layout } from 'src/components/Layout';
import { ThemeProvider } from '@/components/Shared/ThemeContext';
import { AuthProvider } from '@/services/auth.service';
import AccessibilityMenu from "@/components/Shared/AccessibilityMenu"; // import AccessibilityMenu

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className='text-[#1d4d85] app min-w-[280px] min-h-screen bg-background dark:bg-dark'>
        <Layout>
          <AccessibilityMenu />
          <Component {...pageProps} />
        </Layout>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
