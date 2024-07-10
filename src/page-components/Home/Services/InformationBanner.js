import React from 'react';
import { InformationBannerData } from '@/components/Shared/Consts';
import Image from 'next/image';
import ListItem from './ListItem';

const InformationBanner = () => {
    return (
        <div className="flex flex-col-reverse items-center justify-between gap-5 mt-20 sm:flex-row md:gap-10">
        <div className="max-w-xs md:max-w-md">
          <h3 className="mb-5 text-xl font-bold md:text-2xl lg:text-3xl">
            {InformationBannerData.heading}
          </h3>
          <ul className="flex flex-col gap-2 text-sm md:ml-5 md:gap-5">
            {InformationBannerData.texts.map((text, index) => (
              <ListItem key={index} text={text} />
            ))}
          </ul>
        </div>
        <div className="max-w-xs p-5 pb-0 dark:bg-gray-200 rounded-2xl md:max-w-md">
          <Image src={InformationBannerData.img} alt="Banner" />
        </div>
      </div>
    );
};

export default InformationBanner;
