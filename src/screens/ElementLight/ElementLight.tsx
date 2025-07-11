import { ChevronUpIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { BackgroundSection } from "./sections/BackgroundSection";
import { CampaignsSection } from "./sections/CampaignsSection";
import { FooterSection } from "./sections/FooterSection/FooterSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { MainContentSection } from "./sections/MainContentSection";
import { PromotionsSection } from "./sections/PromotionsSection";
import { RouteSearchSection } from "./sections/RouteSearchSection";

export const ElementLight = (): JSX.Element => {
  return (
    <div className="relative w-full bg-white">
      <div className="w-full">
        {/* Promotions section - background layer */}
        <PromotionsSection />

        {/* Header with fixed position - overlaid on promotions */}
        <div className="fixed w-full top-0 left-0 z-50 bg-transparent">
          <div className="relative w-full mx-auto max-w-[1336px]">
            <img
              className="absolute w-[301px] h-[235px] top-[-18px] left-1/2 -translate-x-1/2 object-cover"
              alt="Rectangle"
              src="/rectangle-2.png"
            />
          </div>
          <HeaderSection />
        </div>

        {/* Route Search section - positioned after promotions */}
        <RouteSearchSection />

        {/* Campaigns section */}
        <CampaignsSection />

        {/* Main content section */}
        <MainContentSection />

        {/* Discover More button */}
        <div className="w-full h-[63px] bg-[#4e5660] flex items-center justify-center">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-white hover:bg-transparent"
          >
            <span className="font-light text-[15px] font-['Inter',Helvetica]">
              Discover More
            </span>
            <ChevronUpIcon className="w-[18px] h-[18px]" />
          </Button>
        </div>

        {/* Background and Footer sections */}
        <div className="w-full">
          <BackgroundSection />
          <FooterSection />
        </div>
      </div>
    </div>
  );
};
