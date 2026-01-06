import React, { useState } from "react";
import { Head, Heading, MaxContainer } from "@/components";
import { useGetEquipmentsByCategoryQuery } from "@/redux/api/equipmentsApi";
import { useParams } from "react-router-dom";
import EquipmentCard from "@/components/core-business/EquipmentCard";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const range = (count, folder, ext = "webp") =>
  Array.from({ length: count }, (_, i) => `/${folder}/${i + 1}.${ext}`);

const gallery = [
  {
    id: "trailers",
    images: range(37, "trailers"),
  },
  {
    id: "rigid-chassis",
    images: range(49, "rigid-chassis"),
  },
  {
    id: "stationary-units",
    images: range(4, "stationary-units"),
  },
  {
    id: "transport-refrigeration",
    images: range(21, "transport-refrigeration"),
  },
  {
    id: "factory",
    images: range(4, "factory"),
  },
];

export default function CategoryEquipment() {
  const { t } = useTranslation();
  const { category } = useParams();
  const { data } = useGetEquipmentsByCategoryQuery(category);

  // Find the gallery entry that matches the category param
  const categoryGallery = gallery.find((g) => g.id === category);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handlePrev = () => {
    if (categoryGallery && lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + categoryGallery.images.length) %
          categoryGallery.images.length,
      );
    }
  };

  const handleNext = () => {
    if (categoryGallery && lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % categoryGallery.images.length);
    }
  };

  return (
    <>
      <Head
        title={data?.data?.seo?.title || "Equipments | NBTC"}
        description={data?.data?.seo?.metaDescription || ""}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />


      {/* Lightbox */}
      {lightboxIndex !== null && categoryGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            className="absolute right-5 top-5 text-white"
            onClick={() => setLightboxIndex(null)}
          >
            <LuX size={32} />
          </button>

          <button
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white"
            onClick={handlePrev}
          >
            <LuChevronLeft size={40} />
          </button>

          <img
            src={categoryGallery.images[lightboxIndex]}
            alt={`${category} full ${lightboxIndex + 1}`}
            className="max-h-[90%] max-w-[90%] rounded-lg object-contain"
          />

          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white"
            onClick={handleNext}
          >
            <LuChevronRight size={40} />
          </button>
        </div>
      )}

      <Heading variant="small">
        {t("coreBusiness.browse_more_equipments")}
      </Heading>
      <Heading variant="big">{t("coreBusiness.related_equipments")}</Heading>

      <MaxContainer className="flex flex-wrap justify-center gap-5 px-5 py-10 sm:px-8">
        {data?.data?.map((d) => (
          <EquipmentCard equipment={d} key={d?._id} />
        ))}
      </MaxContainer>
    </>
  );
}
