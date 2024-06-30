import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const NavigationLink = ({ to, page, setSelectedPage }) => {
  const navigate = useNavigate();
  const lowerCasePage = page.toLowerCase().replace(/\s+/g, "");

  const handleLinkClick = (e) => {
    e.preventDefault();
    if (setSelectedPage) {
      setSelectedPage(lowerCasePage);
      setTimeout(() => {
        document
          .getElementById(lowerCasePage)
          .scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
    navigate(to, { replace: true });
  };

  return (
    <NavLink
      className="text-[#1d4d85] transition font-bold text-lg duration-500 hover:text-[#2b7dad]"
      href={`#${lowerCasePage}`}
      onClick={handleLinkClick}
    >
      {page}
    </NavLink>
  );
};

export default NavigationLink;
