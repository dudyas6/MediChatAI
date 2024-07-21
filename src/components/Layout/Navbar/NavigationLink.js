import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NavigationLink = ({ href, page, setSelectedPage }) => {
  const router = useRouter();
  const lowerCasePage = page.toLowerCase().replace(/\s+/g, '');

  const handleLinkClick = (e) => {
    e.preventDefault();
    if (setSelectedPage) {
      setSelectedPage(lowerCasePage);
      setTimeout(() => {
        const element = document.getElementById(lowerCasePage);
        if (!element) return;
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    router.push(href, undefined, { shallow: true });
  };

  return (
    <Link href={href} scroll={false}>
      <a
        className="text-[#1d4d85] transition font-bold text-lg duration-500 hover:text-[#2b7dad]"
        onClick={handleLinkClick}
      >
        {page}
      </a>
    </Link>
  );
};

export default NavigationLink;
