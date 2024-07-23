import '@/assets/index.css';
import '@/assets/toastify-custom.css';
import { Layout } from '@/components/Layout';
import { ThemeProvider } from '@/components/Shared/ThemeContext';
import { AuthProvider } from '@/controllers/auth.controller';
import AccessibilityMenu from '@/components/Shared/AccessibilityMenu';
import { ToastContainer } from 'react-toastify';
export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="text-[#1d4d85] app min-w-[280px] min-h-screen bg-background dark:bg-gray-800">
          <Layout>
            <AccessibilityMenu />
            <Component {...pageProps} />
          </Layout>
        </div>
      </AuthProvider>
      <ToastContainer />
    </ThemeProvider>

  );
}
