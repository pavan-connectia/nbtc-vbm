import React, { useState } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"; // Import Arrows
import { Heading } from "../";
import { useTranslation } from "react-i18next";
import { useGetEquipmentsByFeaturedPopularDeptIdQuery } from "@/redux/api/equipmentsApi";
import EquipmentCard from "../core-business/EquipmentCard";
import Marquee from "react-fast-marquee"; // Import Marquee

const OurServices = () => {
  const { t } = useTranslation();
  const { data: equipDept } = useGetEquipmentsByFeaturedPopularDeptIdQuery();
  
  // State to control animation direction
  const [direction, setDirection] = useState("left");

  const fltrdFeatured = equipDept?.data?.filter((e) => e.featured === true);

  return (
    <div className="my-10">
      <div className="bg-blue">
        <div className="px-3 py-12 mx-auto max-w-[1440px] sm:px-8">
          <Heading
            variant="big"
            className="text-white uppercase mb-10"
          >
            {t("coreBusiness.our_featured_products")}
          </Heading>

          {/* Animation Container */}
          <div className="relative flex items-center group">
            
            {/* Left Control Button (Changes flow to move RIGHT) */}
            <button 
              onClick={() => setDirection("right")}
              className="absolute left-0 z-40 bg-red p-3 text-white transition-all 
                         active:scale-90 hover:scale-110 
                         opacity-100 md:opacity-0 md:group-hover:opacity-100 shadow-xl"
              aria-label="Slide Right"
            >
              <LuArrowLeft size={24} className="rtl:rotate-180" />
            </button>

            {/* Marquee Component */}
            <Marquee
              speed={70}           // Speed of movement
              gradient={false}     // Set true if you want faded edges
              pauseOnHover={true}  // Stops animation when mouse is over a card
              direction={direction} // State controlled direction
              className="py-5"
            >
              <div className="flex gap-6 pr-6">
                {fltrdFeatured?.map((d) => (
                  <div key={d?._id} className="min-w-[300px] sm:min-w-[350px]">
                    <EquipmentCard
                      equipment={{
                        ...d,
                        newHref: `/products-service/equipments/${d?.href}`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </Marquee>

            {/* Right Control Button (Changes flow to move LEFT) */}
            <button 
              onClick={() => setDirection("left")}
              className="absolute right-0 z-40 bg-red p-3 text-white transition-all 
                         active:scale-90 hover:scale-110 
                         opacity-100 md:opacity-0 md:group-hover:opacity-100 shadow-xl"
              aria-label="Slide Left"
            >
              <LuArrowRight size={24} className="rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;