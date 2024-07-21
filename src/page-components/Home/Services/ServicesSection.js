import { useState } from 'react';
import { ServicesData } from '@/components/Shared/Consts';
import Service from './Service';
import ListItem from './ListItem';
import InformationBanner from './InformationBanner';
import SectionWrapper from '../SectionWrapper';
import { SelectedService } from '@/components/Shared/Types';

const ServicesSection = () => {
  const [SelectService, setSelectService] = useState(SelectedService.Cardiology);

  const selectedServiceData = ServicesData.find(
    (service) => service.id === SelectService
  );

  return (
    <SectionWrapper id="services">
      <h2 className="text-4xl font-bold text-center mb-10">Our Services</h2>
      <div className="flex flex-col justify-between lg:flex-row gap-10 lg:gap-5">
        <div className="grid grid-cols-3 gap-5">
          {ServicesData?.map((service, index) => (
            <Service
              key={index}
              service={service}
              SelectService={SelectService}
              setSelectService={setSelectService}
            />
          ))}
        </div>
        <div className="lg:min-w-[345px]">
          <h3 className="text-xl xs:text-2xl font-bold mb-6 text-center">
            {selectedServiceData?.heading}
          </h3>
          <ul className="lg:ml-5 min-h-[200px] sm:min-h-[200px] md:min-h-[190px] lg:min-h-[200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-3 md:gap-2">
            {selectedServiceData?.texts.map((text, index) => (
              <ListItem key={index} text={text} />
            ))}
          </ul>
          <div className="lg:ml-5 mt-5">
          </div>
        </div>
      </div>
      <InformationBanner />
    </SectionWrapper>
  );
};

export default ServicesSection;
