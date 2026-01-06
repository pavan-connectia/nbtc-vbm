import React, { useState } from "react";
import { LuPhoneCall } from "react-icons/lu";
import { Button, Heading, HyperLink, QuotationForm } from "../";
import { useTranslation } from "react-i18next";
import { useGetEquipmentsByFeaturedPopularDeptIdQuery } from "@/redux/api/equipmentsApi";
import EquipmentCard from "../core-business/EquipmentCard";

const OurServices = () => {
  const { t } = useTranslation();
  const { data: equipDept } = useGetEquipmentsByFeaturedPopularDeptIdQuery();
  const [showModal, setShowModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const fltrdFeatured = equipDept?.data?.filter((e) => e.featured === true);

  return (
    <div className="my-10">
      <div className="bg-blue">
        <div className="px-3 py-12 mx-auto sm:px-8">
          <Heading
            variant="big"
            children="Our Featured Equipments"
            className="text-white uppercase"
          >
            {t("coreBusiness.our_featured_products")}
          </Heading>

          <div className="flex w-full gap-5 mx-auto mt-10 overflow-x-auto scrollbar-hide xl:justify-center">
            {fltrdFeatured?.map((d) => (
              <EquipmentCard
                equipment={{
                  ...d,
                  newHref: `/products-service/equipments/${d?.href}`,
                }}
                key={d?._id}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-1 md:flex-row">
        <div className="w-full p-8 bg-accent">
          <div className="flex flex-wrap items-center justify-center gap-5">
            <h5 className="text-sm font-medium font-lato text-blue">
              {t("home.free_quote")}
            </h5>
            <Button
              onClick={() => {
                setSelectedEquipment({
                  title: "General Enquiry",
                  department: import.meta.env.VITE_DEPT_ID,
                });
                setShowModal(true);
              }}
              text={t("home.get_a_quote")}
              className="font-kanit bg-red text-sm font-light text-white"
            />
          </div>
        </div>

        <div className="w-full p-8 bg-accent">
          <div className="flex flex-wrap items-center justify-center gap-5">
            <h5 className="text-sm font-medium font-lato text-blue">
              {t("home.not_sure_which_sol")}
            </h5>
            <HyperLink
              href="/contact"
              icon={<LuPhoneCall />}
              className={"font-kanit bg-red text-sm font-light text-white"}
            >
              {t("nav.contact_us")}
            </HyperLink>
          </div>
        </div>
      </div>

      <QuotationForm isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default OurServices;
