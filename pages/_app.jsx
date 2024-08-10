import '@/assets/index.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/toastify-custom.css';
import { Layout } from '@/components/Layout';
import { ThemeProvider } from '@/components/Shared/ThemeContext';
import { AuthProvider } from '@/controllers/auth.controller';
import { ToastContainer } from 'react-toastify';

export default function MyApp({ Component, pageProps }) {
  const toastOptions = {
    position: 'bottom-center',
    autoClose: 2000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    theme: 'light',
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="flex flex-col min-h-screen text-[#1d4d85] app min-w-[280px] bg-background dark:bg-gray-800">
          <Layout className="flex-grow">
            <Component {...pageProps} />
          </Layout>
          <ToastContainer {...toastOptions} />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
