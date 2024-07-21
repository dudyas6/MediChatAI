import { useRouter } from 'next/router';
import Head from 'next/head';
import { Profile } from '@/page-components/Profile';

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>MediChat | Profile</title>
      </Head>
      <Profile/>
    </>
  );
};

export default ProfilePage;
