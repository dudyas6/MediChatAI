import { SparklesIcon } from '@heroicons/react/20/solid';

const ListItem = ({ text }) => {
  return (
    <li className="flex lg:items-center gap-3 text-sm xs:text-base md:text-lg leading-tight">
      <SparklesIcon className="h-3 w-3 text-[#2c84f7]" />
      <p className="text-base xs:text-lg md:text-xl leading-tight">{text}</p>
    </li>
  );
};

export default ListItem;
