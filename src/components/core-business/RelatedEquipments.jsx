import React, { useRef, useEffect } from "react";
import { Button, Heading, HyperLink, MaxContainer } from "..";
import EquipmentsCard from "./EquipmentCard";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetEquipmentsByDeptIdQuery } from "@/redux/api/equipmentsApi";

const RelatedEquipments = ({ id }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const { data } = useGetEquipmentsByDeptIdQuery();

  const fltrData = data?.data?.filter((d) => d?._id !== id) || [];

  const infiniteData = [...fltrData, ...fltrData];

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const handleScroll = () => {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden py-10">
      <Heading variant="small">
        {t("coreBusiness.browse_more_equipments")}
      </Heading>
      <Heading variant="big">
        {t("coreBusiness.related_equipments")}
      </Heading>

      <MaxContainer className="relative">


        <Button
          icon={<LuArrowLeft size={20} />}
          onClick={handleScrollLeft}
          className="absolute left-0 top-1/2 z-10 mx-5 hidden -translate-y-1/2 rounded-lg bg-blue px-2 text-white lg:block"
        />


        <Button
          icon={<LuArrowRight size={20} />}
          onClick={handleScrollRight}
          className="absolute right-0 top-1/2 z-10 mx-5 hidden -translate-y-1/2 rounded-lg bg-blue px-2 text-white lg:block"
        />

        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex max-w-[1100px] gap-5 overflow-x-auto py-8 lg:mx-auto lg:overflow-x-hidden"
        >
          {infiniteData.map((d, index) => (
            <EquipmentsCard
              key={`${d._id}-${index}`}
              equipment={{
                ...d,
                newHref: `/products-service/equipments/${d?.href}`,
              }}
            />
          ))}
        </div>

        <HyperLink
          onClick={() => navigate(-1)}
          icon={<LuArrowRight className="rtl:rotate-180" />}
          variant="filled"
          className="mx-auto mt-3"
        >
          {t("coreBusiness.view_all_equipments")}
        </HyperLink>
      </MaxContainer>
    </div>
  );
};

export default RelatedEquipments;