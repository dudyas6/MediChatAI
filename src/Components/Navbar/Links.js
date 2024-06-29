import Link from './Link';
import { links } from 'Components/Shared/Consts';

const Links = ({ selectedPage, setSelectedPage }) => {
  return (
    <>
      {links.map((link) => (
        <Link
          key={link}
          page={link}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
      ))}
    </>
  );
};

export default Links;
