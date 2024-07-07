import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useAuth } from "@/services/auth.service";
import UserButton from "@/components/UI/UserButton";
import useMediaQuery from "@/components/Hooks/useMediaQuery";
import Links from "./Links";

const NavBar = ({ flexBetween, selectedPage, setSelectedPage }) => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 900px)");
  const { currentUser } = useAuth();
  return (
    <nav>
      {isAboveMediumScreens && (
        <div className={`${flexBetween} lg:gap-28 gap-20`}>
          <div className={`${flexBetween} gap-16`}>
            <Links
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          <div className="relative">
            <UserButton width={50} height={50} />
            {currentUser && (
              <span className="h-3 w-3 rounded-full border border-white bg-green-500 block absolute bottom-2 right-0"></span>
            )}
          </div>


          </div>
        </div>
      )}
      {!isAboveMediumScreens && (
        <div className="flex flex-row gap-4">
          <div className="relative">
            <UserButton width={50} height={50} />
            {currentUser && (
              <span className="h-3 w-3 rounded-full border border-white bg-green-500 block absolute bottom-2 right-0"></span>
            )}
          </div>
        <button onClick={() => setIsMenuToggled((prev) => !prev)}>
          <Bars3Icon className="h-8 w-8" />
        </button>

        </div>
      )}
      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed right-0 top-0 z-40 h-96 rounded-es-3xl w-[175px] md:w-[300px] bg-secondary drop-shadow-2xl">
          {/* CLOSE ICON */}
          <div className="flex justify-end p-5 md:pr-16 sm:pt-10">
            <button onClick={() => setIsMenuToggled((prev) => !prev)}>
              <XMarkIcon className="h-10 w-10" />
            </button>

          </div>

          {/* MENU ITEMS */}
          <div className="ml-[20%] flex flex-col items-start gap-5 text-2xl">
            <Links
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </div>

        </div>
      )}
    </nav>
  );
};

export default NavBar;
