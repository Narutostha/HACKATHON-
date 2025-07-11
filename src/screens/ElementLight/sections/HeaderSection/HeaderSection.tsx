import { GlobeIcon, SearchIcon, UserIcon } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

export const HeaderSection = (): JSX.Element => {
  const location = useLocation();
  
  const navigationItems = [
    { label: "Home", width: "w-[39px]", path: "/" },
    { label: "Services", width: "w-[80px]", path: "/services" },
    { label: "Public Transport", width: "w-[100px]", path: "/public-transport" },
    { label: "Business & Corporate", width: "w-[146px]", path: "/business" },
    { label: "Media Center", width: "w-[100px]", path: "/media" },
  ];

  return (
    <header className="w-full h-[60px] bg-white relative">
      <div className="w-full max-w-[1320px] h-[60px] mx-auto px-[60px] relative">
        <nav className="flex items-center h-[60px]">
          <div className="flex items-center gap-5 pl-5">
            {navigationItems.map((item, index) => (
              <div
                key={index}
                className={`${item.width} h-[37px] flex items-center justify-center`}
              >
                <Link 
                  to={item.path}
                  className={`h-[37px] flex items-center justify-center transition-colors ${
                    location.pathname === item.path 
                      ? 'border-b-2 border-[#181c89]' 
                      : 'hover:text-[#181c89]'
                  }`}
                >
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#202a50] text-[13px] text-center tracking-[0] leading-[37.4px] whitespace-nowrap">
                    {item.label}
                  </span>
                </Link>
              </div>
            ))}
            <div className="w-2 h-2 bg-[#d9d9d9] ml-[17px]" />
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
            <div className="relative w-[100px] h-10">
              <div className="w-full h-full bg-neutral-100 rounded-[50px] flex items-center px-2">
                <SearchIcon className="w-5 h-5 text-gray-500" />
                <Input
                  placeholder="SearchIcon.."
                  className="flex-1 border-0 bg-transparent text-[11.5px] [font-family:'Inter',Helvetica] font-normal text-[#222222] placeholder:text-[#222222] focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
                />
              </div>
            </div>

            <Button
              variant="secondary"
              size="icon"
              className="w-10 h-10 bg-neutral-100 rounded-[20px] hover:bg-neutral-200"
            >
              <img className="w-5 h-5" alt="Icon" src="/icon-2.svg" />
            </Button>

            <Button
              variant="secondary"
              className="w-[69px] h-10 bg-neutral-100 rounded-[20px] hover:bg-neutral-200"
            >
              <span className="[font-family:'Inter',Helvetica] font-normal text-[#202a50] text-sm text-center tracking-[0] leading-5">
                Eng
              </span>
            </Button>

            <Button
              variant="secondary"
              size="icon"
              className="w-10 h-10 bg-neutral-100 rounded-[20px] hover:bg-neutral-200"
            >
              <GlobeIcon className="w-5 h-5" />
            </Button>

            <Button
              variant="secondary"
              className="w-[89px] h-10 bg-neutral-100 rounded-[20px] hover:bg-neutral-200 flex items-center gap-2 px-2"
              asChild
            >
              <Link to="/contact">
                <UserIcon className="w-5 h-5" />
                <span className="[font-family:'Inter',Helvetica] font-normal text-[#222222] text-[13.5px] text-center tracking-[0] leading-5">
                  Contact
                </span>
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
