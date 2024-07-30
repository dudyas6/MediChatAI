import { useState, useEffect, useRef } from 'react';

const ComboBox = ({ label, options, selectedOptions, setSelectedOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const comboBoxRef = useRef(null);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (comboBoxRef.current && !comboBoxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (value) => {
    setSelectedOptions((prevState) =>
      prevState.includes(value)
        ? prevState.filter((item) => item !== value)
        : [...prevState, value]
    );
  };

  const renderSelectedOptions = (options) => {
    if (options.length <= 4) {
      return options.join(', ');
    }
    const firstThreeOptions = options.slice(0, 4).join(', ');
    return `${firstThreeOptions}, ...`;
  };

  return (
    <div className="relative font-[sans-serif] w-max" ref={comboBoxRef}>
      <label className="block text-sm font-medium text-gray-900">{label}</label>
      <button
        type="button"
        id="dropdownToggle"
        className="flex items-center justify-between px-5 py-1.5 xl:min-w-[450px] mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-black font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {renderSelectedOptions(selectedOptions) || 'Select options'}
        <svg
          className="w-6 h-6 ml-2 text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          id="dropdownMenu"
          className="absolute block shadow-lg bg-white py-2 px-2 z-[1000] min-w-full w-max rounded max-h-96 overflow-auto"
        >
          <li className="mb-2">
            <input
              placeholder="Search..."
              className="px-4 py-2.5 w-full rounded text-black text-sm border-none outline-blue-600 bg-gray-50 focus:bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </li>
          {filteredOptions.map((option) => (
            <li
              key={option}
              className="py-2.5 px-4 hover:bg-blue-50 rounded text-black text-sm cursor-pointer"
              onClick={() => handleCheckboxChange(option)}
            >
              <div className="flex items-center">
                <input
                  id={option}
                  type="checkbox"
                  className="hidden peer"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                <label
                  htmlFor={option}
                  className="relative flex items-center justify-center w-5 h-5 p-1 mr-3 overflow-hidden bg-blue-600 border rounded cursor-pointer peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full fill-white"
                    viewBox="0 0 520 520"
                  >
                    <path
                      d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                      data-name="7-Check"
                      data-original="#000000"
                    />
                  </svg>
                </label>
                {option}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;
