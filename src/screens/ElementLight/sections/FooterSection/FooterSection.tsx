import React from "react";

export const FooterSection = (): JSX.Element => {
  const footerItems = [
    {
      width: "w-16",
      icon: "/icon-3.svg",
      iconClass: "w-6 h-[25px]",
      hasBorder: true,
    },
    {
      width: "w-16",
      icon: "/icon04.svg",
      iconClass: "w-6 h-6 bg-[url(/icon04.svg)] bg-[100%_100%]",
      hasBorder: true,
      isBackground: true,
    },
    {
      width: "w-[172px]",
      icon: "/icon.svg",
      iconClass: "w-[26px] h-[26px]",
      text: "Services catalogue",
      textClass:
        "[font-family:'Inter',Helvetica] font-normal text-[#e41a14] text-[14.8px] text-center tracking-[0] leading-[19px] whitespace-nowrap",
      textWidth: "w-[134px]",
      hasBorder: false,
    },
    {
      width: "w-[90px]",
      icon: "/icon-6.svg",
      iconClass: "w-4 h-4",
      text: "Locations",
      textClass:
        "[font-family:'Inter',Helvetica] font-normal text-[#222222] text-[13.1px] text-center tracking-[0] leading-[19px] whitespace-nowrap",
      textWidth: "w-[61px]",
      hasBorder: true,
      left: "left-[910px]",
    },
    {
      width: "w-28",
      icon: "/icon-5.svg",
      iconClass: "w-4 h-4",
      text: "Media Center",
      textClass:
        "[font-family:'Inter',Helvetica] font-normal text-[#222222] text-[12.9px] text-center tracking-[0] leading-[19px] whitespace-nowrap",
      textWidth: "w-[83px]",
      hasBorder: true,
      left: "left-[1006px]",
    },
    {
      width: "w-24",
      icon: "/icon-7.svg",
      iconClass: "w-3.5 h-[11px]",
      text: "Contact Us",
      textClass:
        "[font-family:'Inter',Helvetica] font-normal text-[#222222] text-[12.9px] text-center tracking-[0] leading-[19px] whitespace-nowrap",
      textWidth: "w-[69px]",
      hasBorder: true,
      left: "left-[1124px]",
    },
  ];

  return (
    <footer className="w-full h-[60px] bg-white shadow-[0px_5px_14px_#00000066] relative">
      <div className="relative w-[1320px] h-[26px] top-[17px] left-[60px]">
        <div className="absolute w-16 h-[26px] top-0 left-5 border-r [border-right-style:solid] border-[#e8e8e8]">
          <img
            className="absolute w-6 h-[25px] top-0 left-5"
            alt="Icon"
            src="/icon-3.svg"
          />
        </div>

        <div className="absolute w-16 h-[26px] top-0 left-[84px] border-r [border-right-style:solid] border-[#e8e8e8]">
          <div className="relative w-6 h-6 top-px left-5 bg-[url(/icon04.svg)] bg-[100%_100%]" />
        </div>

        <div className="absolute w-[172px] h-[26px] top-0 left-[148px]">
          <img
            className="absolute w-[26px] h-[26px] top-0 left-2"
            alt="Icon"
            src="/icon.svg"
          />

          <div className="absolute w-[134px] h-[19px] top-0.5 left-[38px] [font-family:'Inter',Helvetica] font-normal text-[#e41a14] text-[14.8px] text-center tracking-[0] leading-[19px] whitespace-nowrap">
            Services catalogue
          </div>
        </div>

        <div className="absolute w-[90px] h-[26px] top-0 left-[910px] border-r [border-right-style:solid] border-[#e8e8e8]">
          <div className="relative w-[89px] h-[26px]">
            <img
              className="absolute w-4 h-4 top-[5px] left-0"
              alt="Icon"
              src="/icon-6.svg"
            />

            <div className="absolute w-[61px] h-[19px] top-0.5 left-[21px] [font-family:'Inter',Helvetica] font-normal text-[#222222] text-[13.1px] text-center tracking-[0] leading-[19px] whitespace-nowrap">
              Locations
            </div>
          </div>
        </div>

        <div className="w-28 left-[1006px] absolute h-[26px] top-0 border-r [border-right-style:solid] border-[#e8e8e8]">
          <div className="relative w-[111px] h-[26px]">
            <img
              className="absolute w-4 h-4 top-[5px] left-0"
              alt="Icon"
              src="/icon-5.svg"
            />

            <div className="absolute w-[83px] h-[19px] top-0.5 left-[21px] [font-family:'Inter',Helvetica] font-normal text-[#222222] text-[12.9px] text-center tracking-[0] leading-[19px] whitespace-nowrap">
              Media Center
            </div>
          </div>
        </div>

        <div className="w-24 left-[1124px] absolute h-[26px] top-0 border-r [border-right-style:solid] border-[#e8e8e8]">
          <div className="relative w-[95px] h-[26px]">
            <img
              className="absolute w-3.5 h-[11px] top-2 left-0"
              alt="Icon"
              src="/icon-7.svg"
            />

            <div className="absolute w-[69px] h-[19px] top-0.5 left-[19px] [font-family:'Inter',Helvetica] font-normal text-[#222222] text-[12.9px] text-center tracking-[0] leading-[19px] whitespace-nowrap">
              Contact Us
            </div>
          </div>
        </div>

        <div className="absolute w-6 h-[26px] top-0 left-[1226px]">
          <div className="relative h-6 top-px bg-[url(/clip-path-group-2.png)] bg-[100%_100%]" />
        </div>

        <div className="absolute w-6 h-[26px] top-0 left-[1266px]">
          <div className="h-6 bg-[url(/chat-mahboub.svg)] bg-[100%_100%]" />
        </div>
      </div>
    </footer>
  );
};
