import '@/assets/index.css';
import { Layout } from '@/components/Layout';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/components/Services/AuthContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className='text-[#1d4d85] app min-w-[280px] min-h-screen bg-background dark:bg-dark'>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
