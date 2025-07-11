import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const RouteSearchSection = (): JSX.Element => {
  // Define the service cards data for mapping
  const serviceCards = [
    {
      icon: "/car.svg",
      title: "Live GPS Tracking",
      left: "left-20",
    },
    {
      icon: "/fines.svg",
      title: "Payment",
      left: "left-[264px]",
    },
    {
      icon: "/status-health-1.svg",
      title: "Vehicle Status",
      left: "left-[448px]",
      isSpecialIcon: true,
    },
    {
      icon: "/salik.svg",
      title: "Route Finder System",
      left: "left-[632px]",
    },
    {
      icon: "/timetables.svg",
      title: "Belonging Tracking with order status",
      left: "left-[816px]",
    },
    {
      icon: "/bus.svg",
      title: "Nearby Stops and",
      left: "left-[1000px]",
    },
    {
      icon: {
        main: "/vector.svg",
        dot: "/vector-1.svg",
        top: "/vector-3.svg",
        middle: "/vector-2.svg",
        alert: "/alert-svgrepo-com-1.svg",
      },
      title: "SOS Safety Alert",
      left: "left-[1184px]",
      isSOSIcon: true,
    },
  ];

  return (
    <div className="relative w-full h-[170px] mt-[723px]">
      {serviceCards.map((card, index) => (
        <Card
          key={index}
          className={`absolute w-44 h-[170px] top-0 ${card.left} bg-white rounded-2xl overflow-hidden border border-solid border-[#b7b7b740] shadow-[0px_-4px_16px_#7f7f7f1a,0px_4px_16px_#7f7f7f1a] backdrop-blur-[1px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(1px)_brightness(100%)]`}
        >
          <CardContent className="p-0 h-full relative">
            {/* Render different icon types based on card properties */}
            {card.isSpecialIcon ? (
              <div className="absolute w-[52px] h-[52px] top-[21px] left-[62px]">
                <div className="relative h-[52px] overflow-hidden">
                  <img
                    className="absolute w-[800px] h-[800px] top-[-371px] left-[-398px]"
                    alt="Status health"
                    src="/status-health-1.svg"
                  />
                </div>
              </div>
            ) : card.isSOSIcon ? (
              <div className="absolute w-[52px] h-[52px] top-[21px] left-[62px]">
                <div className="absolute w-[52px] h-[52px] top-0 left-0">
                  <div className="h-[52px]">
                    <div className="relative w-[37px] h-[42px] top-[5px] left-2">
                      <img
                        className="absolute w-8 h-8 top-2.5 left-0.5"
                        alt="Vector"
                        src={card.icon.main}
                      />
                      <img
                        className="absolute w-1.5 h-1 top-[22px] left-4"
                        alt="Vector"
                        src={card.icon.dot}
                      />
                      <img
                        className="absolute w-[37px] h-2.5 top-0 left-0"
                        alt="Vector"
                        src={card.icon.top}
                      />
                      <img
                        className="absolute w-[30px] h-[9px] top-1 left-[3px]"
                        alt="Vector"
                        src={card.icon.middle}
                      />
                      <div className="absolute w-[29px] h-7 top-[13px] left-1 bg-[#181c89] rounded-[14.5px/14px]" />
                    </div>
                  </div>
                </div>
                <img
                  className="absolute w-[21px] h-[21px] top-5 left-[15px]"
                  alt="Alert svgrepo com"
                  src={card.icon.alert}
                />
              </div>
            ) : (
              <div
                className="absolute w-[52px] h-[52px] top-[21px] left-[62px] bg-[100%_100%]"
                style={{ backgroundImage: `url(${card.icon})` }}
              />
            )}

            {/* Card title */}
            <div className="absolute w-[150px] h-[42px] top-[88px] left-1/2 transform -translate-x-1/2 font-['Inter',Helvetica] font-bold text-[#181c89] text-[15px] text-center tracking-[0] leading-[22.9px]">
              {card.title}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
