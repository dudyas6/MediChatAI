import React from 'react';
import { useRouter } from 'next/router';
import ScrollLink from './ScrollLink';
import NavigationLink from './NavigationLink';
import { links } from '@/components/Shared/Consts';

const Links = ({ selectedPage, setSelectedPage }) => {
  const router = useRouter();

  return (
    <>
      {router.pathname === '/'
        ? links.map((link) => (
            <ScrollLink
              key={link}
              page={link}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          ))
        : links.map((link) => (
            <NavigationLink
              key={link}
              href="/" // Use href for Next.js Link
              page={link}
              setSelectedPage={setSelectedPage}
            />
          ))}
    </>
  );
};

export default Links;
