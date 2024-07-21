import ResetPasswordForm from 'src/page-components/ResetPassword/ResetPassword';
import Head from 'next/head';

const ResetPassword = () => {
  return (
    <>
      <Head>
        <title>MediChat | Reset Password</title>
      </Head>
      <ResetPasswordForm />
    </>
  );
};

export default ResetPassword;
