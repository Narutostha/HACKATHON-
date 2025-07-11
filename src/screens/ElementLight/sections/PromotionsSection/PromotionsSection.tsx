import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";

export const PromotionsSection = (): JSX.Element => {
  // Carousel slides data
  const slides = [
    {
      id: 1,
      title: "Enjoy seamless connectivity with free Wi-Fi at Every Bus",
      buttonText: "Learn more",
      isActive: true,
    },
    {
      id: 2,
      title: "Slide 2",
      buttonText: "Learn more",
      isActive: false,
    },
    {
      id: 3,
      title: "Slide 3",
      buttonText: "Learn more",
      isActive: false,
    },
    {
      id: 4,
      title: "Slide 4",
      buttonText: "Learn more",
      isActive: false,
    },
    {
      id: 5,
      title: "Slide 5",
      buttonText: "Learn more",
      isActive: false,
    },
  ];

  return (
    <section className="relative w-full h-[900px] bg-black overflow-hidden">
      <div className="relative w-full h-full">
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0 w-full h-[810px] bg-[url(/enjoy-seamless-connectivity-with-free-wi-fi-at-bus-and-marine-st.png)] bg-cover bg-center" />
        <div className="absolute inset-x-0 bottom-0 w-full h-[595px] bg-gradient-to-t from-black/60 via-black/40 to-transparent" />

        {/* Carousel */}
        <Carousel className="relative w-full h-full">
          <CarouselContent className="h-full">
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="h-full">
                <Card className="w-full h-full border-none bg-transparent">
                  <CardContent className="absolute bottom-[80px] left-[60px] w-[1370px] p-0">
                    <div className="p-6 rounded-lg">
                      <div className="mb-4">
                        <h2 className="font-normal text-white text-[24.3px] leading-[32.5px] max-w-[577px]">
                          {slide.title}
                        </h2>
                      </div>
                      <Button
                        variant="outline"
                        className="h-[52px] w-[116px] rounded-lg bg-white border-solid text-[#0e1152] font-bold text-[11.5px]"
                      >
                        {slide.buttonText}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel controls */}
          <div className="absolute bottom-[254px] left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            <CarouselPrevious className="relative w-3 h-3 p-0 bg-transparent border-none shadow-none" />

            <div className="relative w-3 h-3 bg-[url(/pause.svg)] bg-cover" />

            <div className="flex items-center gap-3.5">
              {slides.map((slide, index) => (
                <div
                  key={`indicator-${index}`}
                  className={`w-1.5 h-1.5 rounded-[3px] ${
                    slide.isActive ? "bg-white" : "bg-[#ffffffb2] opacity-20"
                  }`}
                />
              ))}
            </div>

            <CarouselNext className="relative w-3 h-3 p-0 bg-transparent border-none shadow-none" />
          </div>

          {/* Mobile indicator */}
          <div className="absolute bottom-[224px] left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-6 rounded-lg border-2 border-solid border-white opacity-60 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-[3px]" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};
