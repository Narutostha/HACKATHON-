import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";

export const MainContentSection = (): JSX.Element => {
  // Campaign cards data
  const campaignCards = [
    {
      id: 1,
      image: "/an-image-for-don-t-miss-out-on-the-features-of-nol-pay.png",
      title: "Don't miss out on the features of RTA Pay",
    },
    {
      id: 2,
      image:
        "/an-image-for-drive-dubai-s-future-with-the-rta-scaleup-mobility-.png",
      title: "Future with the RTA ScaleUp Mobility Accelerator",
    },
    {
      id: 3,
      image: "/an-image-for-vehicle-licencing.png",
      title: "Status",
    },
  ];

  // Project cards data
  const projectCards = [
    {
      id: 1,
      image: "/al-safa-street-improvement-jpg.png",
      title: "3d Vehicle Location",
    },
    {
      id: 2,
      image: "/burj-khalifa-dubai-mall-metro-station-jpg.png",
      title: "Crowd Estimation",
    },
    {
      id: 3,
      image:
        "/-d8-aa-d9-82-d8-a7-d8-b7-d8-b9--d8-a7-d9-94-d9-85--d8-a7-d9-84-d.png",
      title: "Explansion To The Rular Areas Of Nepal",
    },
  ];

  // Engagement cards data
  const engagementCards = [
    {
      id: 1,
      icon: "/clip-path-group.png",
      title: "Chat with us",
      description: "Chat and apply for services with RTA.",
    },
    {
      id: 2,
      icon: "/clip-path-group-1.png",
      title: "Community Engagement Platform",
      description: "Discover our projects, take part in decisions, and more.",
    },
    {
      id: 3,
      icon: "/feedback.svg",
      title: "Feedback & Ideas",
      description: "Let us know your ideas, complaints or questions.",
    },
    {
      id: 4,
      icon: "/emails.svg",
      title: "Email us",
      description: "Send your questions or ideas by email.",
    },
  ];

  return (
    <section className="w-full">
      {/* Campaigns and promotions section */}
      <div className="w-full py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h2 className="font-normal text-[26px] leading-[56px] text-[#222222]">
              Campaigns and promotions
            </h2>
            <p className="font-normal text-[13px] leading-[19px] text-[#222222]">
              Explore new experiences and discover our latest campaigns and
              promotions.
            </p>
          </div>

          <div className="relative">
            <div className="flex gap-6 mb-12">
              {campaignCards.map((card) => (
                <Card
                  key={card.id}
                  className="w-full overflow-hidden border border-[#7f7f7f1a] shadow-[0px_4px_16px_#7f7f7f1a,0px_-4px_16px_#7f7f7f1a]"
                >
                  <div
                    className="h-[300px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${card.image})` }}
                  />
                  <CardContent className="p-5 pt-6">
                    <h3 className="font-normal text-[13px] leading-[19px] text-black mb-8">
                      {card.title}
                    </h3>
                    <div className="text-[#181c89] text-[11.3px] leading-[15.3px] underline text-center w-[59px]">
                      Read More
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Navigation buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-[140px] bg-[#0e1152] opacity-40 rounded-[0px_8px_8px_0px]"
            >
              <div className="w-[22px] h-9 bg-[url(/chevron-left-1.svg)] bg-[100%_100%]" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-[140px] bg-[#0e1152] opacity-40 rounded-[8px_0px_0px_8px]"
            >
              <div className="w-[22px] h-9 bg-[url(/chevron-right-1.svg)] bg-[100%_100%]" />
            </Button>

            <div className="flex justify-center">
              <Button
                variant="outline"
                className="border border-[#13166e] text-[#13166e] text-[11.5px] leading-[15.3px] h-[50px] px-6"
              >
                Our latest campaigns &amp; promotions
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Projects and milestones section */}
      <div className="w-full py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-normal text-[26px] leading-[56px] text-[#222222]">
                Projects and milestones
              </h2>
              <p className="font-normal text-[13px] leading-[19px] text-[#222222] max-w-[620px]">
                Explore our wide range of completed and ongoing projects to see
                how RTA is committed to providing
                <br />
                efficient, sustainable transportation solutions.
              </p>
            </div>
            <Button
              variant="outline"
              className="border border-[#d1d2e7] h-[50px] w-[260px]"
            >
              <span className="mr-auto text-[13.1px] leading-5 text-[#222222]">
                Ongoing projects
              </span>
              <img
                className="w-2.5 h-1.5"
                alt="Dropdown indicator"
                src="/image-2.svg"
              />
            </Button>
          </div>

          <div className="flex gap-6 mb-12">
            {projectCards.map((card) => (
              <Card
                key={card.id}
                className="w-full overflow-hidden border border-[#7f7f7f1a] shadow-[0px_4px_16px_#7f7f7f1a,0px_-4px_16px_#7f7f7f1a]"
              >
                <div
                  className="h-[306px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <CardContent className="p-5 pt-6">
                  <h3 className="font-normal text-[13px] leading-[19px] text-black mb-8">
                    {card.title}
                  </h3>
                  <div className="text-[#181c89] text-[11.3px] leading-[15.3px] underline text-center w-[59px]">
                    Read More
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              className="border border-[#13166e] text-[#13166e] text-[11.3px] leading-[15.3px] h-[50px] px-6"
            >
              View our ongoing projects
            </Button>
          </div>
        </div>
      </div>

      {/* RTA smart apps section */}
      <div className="w-full py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h2 className="font-normal text-[26px] leading-[56px] text-[#222222]">
              RTA smart apps
            </h2>
            <p className="font-normal text-[13px] leading-[19px] text-[#222222]">
              RTA strives to make you happy. It aims to support Dubai's
              transformation into a smart city and foster its strategic goals.
              To achieve that, RTA provides a fast and easy access to its
              services via smart applications
              <br />
              designed to meet your needs.
            </p>
          </div>

          <div className="mb-12">
            <Tabs defaultValue="rtaNepalApp">
              <TabsList className="border-b border-[#d1d2e7] w-full justify-start h-[45px] bg-transparent p-0">
                <TabsTrigger
                  value="rtaNepalApp"
                  className="data-[state=active]:bg-white data-[state=active]:border-t data-[state=active]:border-r data-[state=active]:border-l data-[state=active]:border-[#d1d2e7] data-[state=active]:border-b-0 data-[state=active]:rounded-t-lg data-[state=inactive]:bg-[#f4f4f4] data-[state=inactive]:border-b data-[state=inactive]:border-[#d1d2e7] h-[45px] px-4"
                >
                  RTA Nepal App
                </TabsTrigger>
                <TabsTrigger
                  value="track"
                  className="data-[state=active]:bg-white data-[state=active]:border-t data-[state=active]:border-r data-[state=active]:border-l data-[state=active]:border-[#d1d2e7] data-[state=active]:border-b-0 data-[state=active]:rounded-t-lg data-[state=inactive]:bg-[#f4f4f4] data-[state=inactive]:border-b data-[state=inactive]:border-[#d1d2e7] h-[45px] px-4"
                >
                  Track
                </TabsTrigger>
                <TabsTrigger
                  value="pay"
                  className="data-[state=active]:bg-white data-[state=active]:border-t data-[state=active]:border-r data-[state=active]:border-l data-[state=active]:border-[#d1d2e7] data-[state=active]:border-b-0 data-[state=active]:rounded-t-lg data-[state=inactive]:bg-[#f4f4f4] data-[state=inactive]:border-b data-[state=inactive]:border-[#d1d2e7] h-[45px] px-4"
                >
                  Pay
                </TabsTrigger>
              </TabsList>

              <TabsContent value="rtaNepalApp" className="mt-0">
                <Card className="rounded-[0px_8px_8px_8px] border border-[#d1d2e7] shadow-[0px_6px_16px_#7f7f7f1a]">
                  <CardContent className="p-0 flex">
                    <div className="w-1/2 p-8">
                      <div className="flex items-center mb-12">
                        <img
                          className="w-[105px] h-[90px] object-cover"
                          alt="RTA Nepal App Logo"
                          src="/rectangle-2.png"
                        />
                        <span className="ml-5 text-[16.9px] leading-[18px] text-[#222222]">
                          RTA Nepal App
                        </span>
                      </div>

                      <p className="text-[13px] leading-[19px] text-[#222222] mb-4">
                        "RTA Nepal " is a digital platform that brings all your
                        public transportation services
                        <br />
                        together in one place, allowing you to easily complete
                        everything you need through a single
                        <br />
                        app.
                      </p>

                      <div className="text-[#13166e] text-[11.5px] leading-[15.3px] underline mb-12">
                        Read more
                      </div>

                      <div className="flex gap-4">
                        <div className="w-[30px] h-[30px] bg-[url(/app-ios.svg)] bg-[100%_100%]" />
                        <div className="w-[30px] h-[30px] bg-[url(/app-android.svg)] bg-[100%_100%]" />
                        <div className="w-[30px] h-[30px] bg-[url(/app-gallery.svg)] bg-[100%_100%]" />
                      </div>
                    </div>

                    <div className="w-1/2">
                      <img
                        className="w-full h-[400px]"
                        alt="RTA Nepal App Screenshot"
                        src="/image-1.png"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="track">
                {/* Content for Track tab */}
              </TabsContent>

              <TabsContent value="pay">{/* Content for Pay tab */}</TabsContent>
            </Tabs>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              className="border border-[#13166e] text-[#13166e] text-[11.3px] leading-[15.3px] h-[50px] px-6"
            >
              See more RTA smart apps
            </Button>
          </div>
        </div>
      </div>

      {/* Newsletter subscription section */}
      <div className="w-full py-12">
        <div className="container mx-auto px-4">
          <Card className="shadow-[0px_4px_20px_#b7b7b740,0px_-4px_20px_#b7b7b740] backdrop-blur-[1px]">
            <CardContent className="p-6">
              <h2 className="font-normal text-[26px] leading-[56px] text-[#222222] mb-6">
                Subscribe to our newsletter
              </h2>

              <div className="flex gap-4">
                <div className="w-full max-w-[296px]">
                  <label className="font-bold text-[13.8px] leading-5 text-[#222222] block mb-2">
                    Full name
                  </label>
                  <Input
                    placeholder="Enter name"
                    className="h-10 border-[#13166e33] text-[#757575] text-[12.5px]"
                  />
                </div>

                <div className="w-full max-w-[296px]">
                  <label className="font-bold text-sm leading-5 text-[#222222] block mb-2">
                    Email
                  </label>
                  <Input
                    placeholder="e.g. name@domain.ae"
                    className="h-[50px] border-[#13166e33] text-[#757575] text-[13.2px]"
                  />
                </div>

                <div className="w-full max-w-[296px]">
                  <label className="font-bold text-[13.3px] leading-5 text-[#222222] block mb-2">
                    Mobile
                  </label>
                  <Input
                    placeholder="05xxxxxxxx"
                    className="h-10 border-[#13166e33] text-[#757575] text-[13px]"
                  />
                </div>

                <Button className="w-full max-w-[296px] h-[50px] bg-[#181c89] text-white text-[11.1px] leading-[15.3px] mt-8">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Engage with Us section */}
      <div className="w-full py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h2 className="font-normal text-[26px] leading-[56px] text-[#595959]">
              Engage with Us
            </h2>
            <p className="font-normal text-[13px] leading-[19px] text-[#222222]">
              We are here for you. Do not hesitate to communicate with us via
              the following channels:
            </p>
          </div>

          <div className="flex gap-6">
            {engagementCards.map((card) => (
              <Card
                key={card.id}
                className="w-full max-w-[296px] border border-[#7f7f7f1a] shadow-[0px_4px_16px_#7f7f7f1a,0px_-4px_16px_#7f7f7f1a]"
              >
                <CardContent className="p-8 flex flex-col items-center">
                  <div
                    className="w-9 h-9 bg-[100%_100%] mb-8"
                    style={{ backgroundImage: `url(${card.icon})` }}
                  />
                  <div className="text-center">
                    <h3 className="font-bold text-[13px] leading-[19px] text-black">
                      {card.title}
                    </h3>
                    <p className="font-normal text-[13px] leading-[19px] text-black">
                      {card.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
