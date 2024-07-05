import { Profile } from 'src/page-components/Profile';
import Head from 'next/head';

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Profile />
    </>
  );
};

export default ProfilePage;
