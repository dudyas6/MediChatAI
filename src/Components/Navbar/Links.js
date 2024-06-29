import React from "react";
import { useLocation } from "react-router-dom";
import ScrollLink from "./ScrollLink";
import NavigationLink from "./NavigationLink";
import { links } from "Components/Shared/Consts";

const Links = ({ selectedPage, setSelectedPage }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/"
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
            to={"/"} 
            page={link}
            setSelectedPage={setSelectedPage} />
          ))}
    </>
  );
};

export default Links;
