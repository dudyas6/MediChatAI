import Image from 'next/image';

const Service = ({ SelectService, setSelectService, service }) => {
  const lowerCaseService = service.title
    .toLowerCase()
    .replace(/\s+/g, '');

  return (
    <div
      onClick={() => setSelectService(lowerCaseService)}
      className={`${
        SelectService === lowerCaseService
          ? 'bg-[#6adcff] rounded-ss-[25px] xs:rounded-ss-[50px] sm:rounded-ss-[75px] max-h-[250px]'
          : 'bg-[#ffffffd1] hover:bg-[#c2f1ff] rounded-lg max-h-[250px]'
      } cursor-pointer transition-all rounded-lg flex flex-col items-center gap-4 p-2 xs:p-4 lg:p-10 shadow-md `}
    >
      <Image
        className="max-w-[30px] xs:max-w-[50px] md:max-w-[75px] lg:max-w-[60px]"
        src={service.img}
        alt={service.title}
      />
      <p className="text-[20px] font-bold sm:text-sm lg:text-xl">
        {service.title}
      </p>
    </div>
  );
};

export default Service;
