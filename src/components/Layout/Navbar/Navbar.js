import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useAuth } from "@/controllers/auth.controller";
import UserButton from "@/components/UI/UserButton";
import useMediaQuery from "@/components/Hooks/useMediaQuery";
import Links from "./Links";

const NavBar = ({ flexBetween, selectedPage, setSelectedPage }) => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 900px)");
  const { currentUser } = useAuth();

  return (
    <nav>
      {isAboveMediumScreens ? (
        <div className={`${flexBetween} lg:gap-28 gap-20`}>
          <div className={`${flexBetween} gap-16`}>
            <Links
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <div className="relative">
              <UserButton width={50} height={50} />
              {currentUser && (
                <span className="absolute right-0 block w-3 h-3 bg-green-500 border border-white rounded-full bottom-2"></span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-4">
          <button onClick={() => setIsMenuToggled((prev) => !prev)}>
            <Bars3Icon className="w-8 h-8" />
          </button>
        </div>
      )}

      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed right-0 top-0 z-40 h-96 rounded-es-3xl w-[175px] md:w-[300px] bg-secondary drop-shadow-2xl">
          {/* CLOSE ICON */}
          <div className="flex justify-end p-5 md:pr-16 sm:pt-10">
            <button onClick={() => setIsMenuToggled((prev) => !prev)}>
              <XMarkIcon className="w-10 h-10" />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className="relative mb-5 right-12 sm:right-6 md:right-16 xs:right-7">
            <UserButton width={50} height={50} />
            {currentUser && (
              <span className="absolute block w-3 h-3 bg-green-500 border border-white rounded-full left-36 bottom-2 xs:left-24 md:left-36"></span>
            )}
          </div>
          <div className="ml-[20%] flex flex-col items-start gap-5 text-2xl">
            <Links
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            {/* Move UserButton into the menu */}

          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
