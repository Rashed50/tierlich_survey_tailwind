"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";

export default function SetNumberOfPet() {
   const [selected, setSelected] = useState();
   const searchParams = useSearchParams();
   const router = useRouter();

   const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
   const t = langContent[lang];

   const handleSubmit = (e) => {
      e.preventDefault();
      //   if (!selected) {
      //       setError(true);
      //       return;
      //   }

      //  sessionStorage.setItem("number_of_pets", selected);

      router.push("/food_purchase_location/monthly_spent/living_condition");
   };

   const getButtonStyle = (option) =>
      option === selected
         ? "bg-white text-[#4A3A2D] border-2 border-[#4A3A2D]"
         : "bg-[#4A3A2D] text-white";

   return (
      <form
         onSubmit={handleSubmit}
         className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]"
      >
         <HeaderComponent progress={60} />

         {/* Question Text */}
         <div className="text-center mt-10 px-4 text-xl font-semibold">
            {t.qs_pet_user_age}
         </div>

         {/* Answer Buttons */}
         <div className="flex flex-col gap-4 items-center justify-center mt-10 px-4">
            <button
               type="button"
               onClick={() => setSelected("unter 18 Jahre")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "unter 18 Jahre"
               )}`}
            >
               {"unter 18 Jahre"}
            </button>

            <button
               type="button"
               onClick={() => setSelected("19-26 Jahre")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "19-26 Jahre"
               )}`}
            >
               {"19-26 Jahre"}
            </button>

            <button
               type="button"
               onClick={() => setSelected("27-35 Jahre")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "27-35 Jahre"
               )}`}
            >
               {"27-35 Jahre"}
            </button>

            <button
               type="button"
               onClick={() => setSelected("35-45 Jahre")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "35-45 Jahre"
               )}`}
            >
               {"35-45 Jahre"}
            </button>

            <button
               type="button"
               onClick={() => setSelected("45-60 Jahre")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "45-60 Jahre"
               )}`}
            >
               {"45-60 Jahre"}
            </button>
            <button
               type="button"
               onClick={() => setSelected("älter als 60 Jahre")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "älter als 60 Jahre"
               )}`}
            >
               {"älter als 60 Jahre"}
            </button>
         </div>

         {/* Footer */}
         <FooterComponent
            backHref="/food_purchase_location/qs_what_do_you_feed"
            nextHref="/food_purchase_location/monthly_spent/living_condition"
            isSubmit
         />
      </form>
   );
}
