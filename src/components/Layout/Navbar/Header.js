import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Image from 'next/image';
import mediChatLogo from '@/assets/Logos/medichat.png'; // Adjust the import path as per your actual file location

const Header = () => {
  const [selectedPage, setSelectedPage] = useState('home');
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const sectionRefs = useRef({});
  const router = useRouter();
  const flexBetween = 'flex items-center justify-between';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage('home');
      } else {
        setIsTopOfPage(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setSelectedPage(id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      sectionRefs.current[section.id] = section;
      observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [router.pathname]);

  return (
    <div
      className={`${flexBetween} ${
        isTopOfPage ? 'bg-background' : 'bg-[#84ceff] dark:bg-blue-400'
      } transition fixed top-0 z-30 w-full p-5 md:px-16 shadow-md`}
    >
      <Image src={mediChatLogo} width={300} height={50} alt="Logo" />
      <Navbar
        flexBetween={flexBetween}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
    </div>
  );
};

export default Header;
