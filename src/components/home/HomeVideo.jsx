import React from "react";
import { Heading } from "..";

const HomeVideo = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative z-10 flex h-full items-center justify-center px-4 py-8 sm:py-12">
        <Heading variant="big">Fuel Tank</Heading>
      </div>
      
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[60vh]">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 h-full">
          <div className="relative w-full h-full rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/Fuel-Tank-3D-video.mp4" 
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default HomeVideo;