import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";

export const CampaignsSection = (): JSX.Element => {
  return (
    <Card className="w-full h-[461px] rounded-lg overflow-hidden shadow-[0px_4px_20px_#b7b7b740,0px_-4px_20px_#b7b7b740] backdrop-blur-[1px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(1px)_brightness(100%)]">
      <CardContent className="p-0 flex h-full">
        <div className="w-1/2 h-full p-6">
          <div className="flex items-center mb-5">
            <div className="w-6 h-6 bg-[url(/journey-planner.svg)] bg-[100%_100%]" />
            <h2 className="ml-[39px] font-normal text-[#222222] text-[26.4px] leading-[56px]">
              Find Your Route
            </h2>
          </div>

          <p className="text-[13px] text-[#222222] leading-5 mb-10">
            The results shown are a quick guides of your journey. For more
            details, visit our
          </p>

          <div className="mb-5">
            <label className="block text-[13.1px] text-[#222222] leading-5 mb-[25px]">
              Select starting point
            </label>
            <Input
              className="h-10 rounded-lg border-[#13166e33]"
              placeholder="e.g: Location, Stop Id"
            />
          </div>

          <div className="mb-[50px]">
            <label className="block text-[13.2px] text-[#222222] leading-5 mb-[25px]">
              Select destination point
            </label>
            <Input
              className="h-10 rounded-lg border-[#13166e33]"
              placeholder="e.g: Location, Stop Id"
            />
          </div>

          <div className="flex gap-[32px] ml-3">
            <Button className="w-[279px] h-[50px] bg-[#181c89] text-white text-[11.3px] rounded-lg">
              Search
            </Button>
            <Button
              variant="outline"
              className="w-[279px] h-[50px] border-[#13166e] text-[#13166e] text-[11.7px] rounded-lg"
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="w-1/2 h-full relative">
          <img
            className="absolute w-[605px] h-[461px] top-[-5px] right-0"
            alt="Bus advertisement"
            src="/image.png"
          />
        </div>
      </CardContent>
    </Card>
  );
};
