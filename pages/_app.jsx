import '@/assets/index.css';
import 'react-toastify/dist/ReactToastify.css';
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
      <ToastContainer
        position="bottom-center" // Position of the toast notifications
        autoClose={2000} // Auto close duration in milliseconds
        hideProgressBar={false} // Whether to hide the progress bar
        newestOnTop={false} // Whether the newest toast appears on top
        closeOnClick // Close toast on click
        rtl={false} // Right-to-left support
        pauseOnFocusLoss // Pause auto-close timer on focus loss
        draggable // Allow to drag the toast
        theme="light" // Theme of the toast (light or dark)
      />
    </ThemeProvider>

  );
}
