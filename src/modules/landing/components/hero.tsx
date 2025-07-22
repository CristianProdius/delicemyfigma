"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Header from "@/components/header";

export const Hero = () => {
  return (
    <section
      className="
      z-10 
      flex 
      flex-col 
      w-[95%]
      sm:w-[92%]
      lg:w-[90%]
      max-w-12xl
      h-auto 
      min-h-[calc(100vh-2rem)] 
      sm:min-h-[calc(100vh-3rem)]
      lg:h-[90%] 
      bg-white/10 
      backdrop-blur-md 
      rounded-2xl 
      sm:rounded-3xl
      lg:rounded-4xl 
      p-4 
      sm:p-6
      lg:p-8
      overflow-hidden 
    "
    >
      <Header />

      {/* Responsive grid with better breakpoints */}
      <div
        className="
        grid 
        grid-cols-1 
        md:grid-cols-2
        gap-6 
        sm:gap-8
        lg:gap-12
        items-center
        flex-1 
      "
      >
        {/* Left Content */}
        <div
          className="
          space-y-4 
          sm:space-y-6
          lg:space-y-8
          order-2 
          md:order-1
        "
        >
          <h1
            className="
            text-3xl 
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            xl:text-7xl
            font-light 
            text-white 
            leading-tight
            tracking-tight
          "
          >
            The Art of Chocolate
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Perfected
          </h1>

          <Button
            size="lg"
            className="
              bg-white 
              text-amber-900 
              hover:bg-white/90 
              active:bg-white/80 
              rounded-full 
              px-6 
              py-3
              sm:px-8 
              sm:py-4
              lg:py-5
              text-base
              sm:text-lg 
              font-normal
              w-full 
              sm:w-auto
              transition-all 
              touch-manipulation 
            "
          >
            Begin Your Journey
          </Button>

          {/* Quote Section */}
          <div
            className="
            pt-4 
            sm:pt-6
            lg:pt-8 
            border-t 
            border-white/20
          "
          >
            <p className="text-white/60 text-xs sm:text-sm mb-2">
              // Alexa Deli
            </p>
            <p
              className="
              text-white/80 
              text-xs 
              sm:text-sm 
              max-w-full 
              sm:max-w-md
            "
            >
              I believe chocolate is more than confection—it's a medium for
              connection, creativity, and unforgettable moments.
            </p>
          </div>
        </div>

        {/* Right Content - Cards */}
        <div
          className="
          relative 
          space-y-3 
          sm:space-y-4 
          md:pl-0
          lg:pl-8
          xl:pl-16
          order-1 
          md:order-2
        "
        >
          {/* Happy Clients Card */}
          <Card
            className="
            bg-white/10 
            backdrop-blur-md 
            border-white/20 
            p-3 
            sm:p-4
            lg:p-6 
            rounded-xl /* Changed: Responsive radius */
            sm:rounded-2xl 
            w-full /* Full width on mobile */
            sm:max-w-sm 
            md:ml-auto
          "
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex -space-x-2 sm:-space-x-3">
                {/* Responsive avatar sizing */}
                <Avatar
                  className="
                  border-2 
                  border-white 
                  w-8 h-8 /* Changed: Smaller on mobile */
                  sm:w-10 sm:h-10
                "
                >
                  <AvatarImage src="/img/avatar1.jpg" />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <Avatar
                  className="
                  border-2 
                  border-white
                  w-8 h-8
                  sm:w-10 sm:h-10
                "
                >
                  <AvatarImage src="/img/avatar2.jpg" />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <Avatar
                  className="
                  border-2 
                  border-white
                  w-8 h-8
                  sm:w-10 sm:h-10
                "
                >
                  <AvatarImage src="/img/avatar3.jpg" />
                  <AvatarFallback>U3</AvatarFallback>
                </Avatar>
                <Avatar
                  className="
                  border-2 
                  border-white 
                  bg-amber-600
                  w-8 h-8
                  sm:w-10 sm:h-10
                "
                >
                  <AvatarFallback className="text-white text-xs sm:text-sm">
                    +
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="text-right">
                <p
                  className="
                  text-2xl /* Changed: Responsive text */
                  sm:text-3xl 
                  font-light 
                  text-white
                "
                >
                  157K
                </p>
                <p
                  className="
                  text-xs /* Changed: Responsive text */
                  sm:text-sm 
                  text-white/80
                "
                >
                  Happy Clients
                </p>
              </div>
            </div>
          </Card>

          {/* Tiramisu Card */}
          <Card
            className="
            bg-white/10 
            backdrop-blur-md 
            border-white/20 
            p-3 /* Changed: Responsive padding */
            sm:p-4 
            rounded-xl /* Changed: Responsive radius */
            sm:rounded-2xl 
            w-full /* Full width on mobile */
            sm:max-w-sm 
            md:ml-auto
          "
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div
                className="
                relative 
                w-16 h-16 /* Changed: Responsive sizing */
                sm:w-20 sm:h-20
                lg:w-24 lg:h-24 
                rounded-lg /* Changed: Responsive radius */
                sm:rounded-xl 
                overflow-hidden 
                flex-shrink-0
              "
              >
                <Image
                  src="/img/tiramisu.jpg"
                  alt="Tiramisu"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                />
              </div>
              <div className="min-w-0">
                {" "}
                {/* Added: Prevent text overflow */}
                <h3
                  className="
                  text-white 
                  font-light 
                  text-base /* Changed: Responsive text */
                  sm:text-lg
                  truncate /* Added: Handle long text */
                "
                >
                  The Art of Tiramisu
                </h3>
                <p
                  className="
                  text-white/60 
                  text-xs /* Changed: Responsive text */
                  sm:text-sm
                  hover:text-white/80 /* Added: Interactive feedback */
                  transition-colors
                  cursor-pointer
                "
                >
                  Read More →
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
