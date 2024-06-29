import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationLink = ({ to, page, selectedPage, setSelectedPage }) => {
  const navigate = useNavigate();
  const lowerCasePage = page.toLowerCase().replace(/\s+/g, '');

  const handleLinkClick = (e) => {
    e.preventDefault();
    setSelectedPage(lowerCasePage);
    navigate(to, { replace: true });
    setTimeout(() => {
      document.getElementById(lowerCasePage).scrollIntoView({ behavior: "smooth" });
    }, 100); // Timeout to ensure the navigation has taken place
  };

  return (
    <a
      className="text-[#1d4d85] transition font-bold text-lg duration-500 hover:text-[#2b7dad]"
      href={`#${lowerCasePage}`}
      onClick={handleLinkClick}
    >
      {page}
    </a>
  );
};

export default NavigationLink;
