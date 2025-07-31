"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";

export default function SetNumberOfPet() {
   const [selected, setSelected] = useState();
   const [error, setError] = useState(false);
   const router = useRouter();

   const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
   const t = langContent[lang];

   const no_of_pet = sessionStorage.getItem("number_of_pets");

   const handleSubmit = (e) => {
      e.preventDefault();
      // if (!selected) {
      //    setError(true);
      //    return;
      // }
      // setError(false);
      // console.log("Selected option:", selected);

      router.push("/food_purchase_location/monthly_spent/lead_PLZ");
   };

   const handleBack = () => {
      router.push(
         "/food_purchase_location/monthly_spent/living_situation_family"
      );
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
            {no_of_pet == "1"
               ? t.qs_other_info_for_1_pet
               : t.qs_other_info_for_2ormore_pets}
         </div>

         {error && (
            <p className="text-red-500 text-center mb-2">
               Bitte wählen Sie eine Option aus
            </p>
         )}

         {/* Answer Buttons */}
         <div className="flex flex-col gap-4 items-center justify-center mt-10 px-4">
            <input
               type="text"
               // value={""}
               // onChange={(e) => setText(e.target.value)}
               placeholder="Enter additional information"
               className="w-full max-w-xs h-10 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
         </div>

         {/* Footer */}
         <FooterComponent onBack={handleBack} isSubmit />
      </form>
   );
}
