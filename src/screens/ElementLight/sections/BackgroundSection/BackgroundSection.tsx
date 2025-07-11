import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import React from "react";

export const BackgroundSection = (): JSX.Element => {
  // Social media icons data
  const socialIcons = [
    { icon: <FacebookIcon className="w-6 h-6" />, position: "left-0" },
    { icon: <InstagramIcon className="w-6 h-6" />, position: "left-[63px]" },
    { icon: <TwitterIcon className="w-6 h-6" />, position: "left-[126px]" },
    { icon: <YoutubeIcon className="w-6 h-6" />, position: "left-[188px]" },
    { icon: <LinkedinIcon className="w-6 h-6" />, position: "left-[251px]" },
  ];

  return (
    <footer className="w-full bg-white py-8 px-6">
      <div className="max-w-[1320px] mx-auto">
        {/* Social Media Icons */}
        <div className="relative h-[31px] mb-12">
          {socialIcons.map((item, index) => (
            <div
              key={index}
              className={`absolute w-6 h-6 top-0 ${item.position}`}
            >
              {item.icon}
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between">
          <div className="max-w-[640px]">
            {/* Copyright Information */}
            <p className="[font-family:'Inter',Helvetica] text-[#4e5660] text-[14.6px] leading-6 mb-3">
              <span className="font-light">Copyright © 2025 </span>
              <span className="font-normal">Roads and Transport Authority</span>
              <span className="font-light">, all rights reserved.</span>
            </p>

            {/* Maintenance Information */}
            <p className="[font-family:'Inter',Helvetica] font-light text-[#4e5660] text-[14.4px] leading-6">
              This site is maintained by the Roads and Transport Authority.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            {/* Browser Compatibility */}
            <p className="[font-family:'Inter',Helvetica] font-light text-[#4e5660] text-[14.5px] leading-6">
              The site is best viewed using Microsoft Edge, Mozilla Firefox,
              Safari and Chrome.
            </p>

            {/* Last Modified */}
            <p className="[font-family:'Inter',Helvetica] font-normal text-[#4e5660] text-[14.5px] leading-6 mt-2">
              Page last modified: 11 July 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
