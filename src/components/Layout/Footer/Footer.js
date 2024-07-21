import Image from 'next/image';
import mediChatLogo from '@/assets/Logos/medichat.png';
const Footer = () => {
  return (
    <div className="bg-[#aed4ff] dark:dark:bg-blue-400 p-6 md:px-16 shadow-md">
      <div className="max-w-[1250px] m-auto flex justify-center gap-14 flex-wrap md:flex-nowrap">
      <Image src={mediChatLogo} width={300} height={50} alt="Logo" />
        <div className="justify-center font-bold">

          <span className="self-center text-sm font-semibold sm:text-xl whitespace-nowrap dark:text-gray-200">
            MediChat - Your AI Healthcare Consultant
          </span>
          <span className="block text-sm text-gray-500 sm:text-xl sm:text-center dark:text-gray-350">
            © 2023{" "}
            <a href="/" className="hover:underline">
              MediChat
            </a>
            , All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
