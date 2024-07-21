import { cardNums } from '@/components/Shared/Consts';

const DescNums = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5 px-10 mt-10 text-center xs:px-16 sm:px-5 md:px-0 md:flex-nowrap md:justify-around">
      {cardNums.map((cardNums, index) => (
        <div
          className="rounded-3xl shadow-xl p-6 md:px-2 lg:w-1/5 w-xl bg-[#ffffffd1] dark:bg-gray-600"
          key={index}
        >
          <h3 className="mb-2 text-2xl font-bold lg:text-4xl">{cardNums.num}</h3>
          <p className="text-sm lg:text-base">{cardNums.text}</p>
        </div>
      ))}
    </div>
  );
};

export default DescNums;
