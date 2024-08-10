import Head from 'next/head';
import Footer from './Footer/Footer';
import Header from './Navbar/Header';
import AccessibilityMenu from '@/components/Shared/AccessibilityMenu';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>MediChat</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          property="og:title"
          content="MediChat - Intelligent AI Health Consultant"
        />
      </Head>
      <Header />

      <main>{children}</main>
      <Footer />
      <AccessibilityMenu />
    </>
  );
};

export default Layout;
