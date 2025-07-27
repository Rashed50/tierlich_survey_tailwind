"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";

export default function SetNumberOfPet() {
   const router = useRouter();
   const searchParams = useSearchParams();

   const [selected, setSelected] = useState();
   const [error, setError] = useState(false);

   const from = searchParams.get('from');

   const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
   const t = langContent[lang];

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!selected) {
         setError(true);
         return;
      }
      setError(false);
      console.log("Selected option:", selected);
      //  sessionStorage.setItem("number_of_pets", selected);
      router.push("/food_purchase_location/monthly_spent/importance_purchase");
   };

   const handleBack = () => {
      if (from === 'stationary') {
         router.push("/food_purchase_location/stationary/obstacles");
      } else if (from === 'online') {
         router.push("/food_purchase_location/online_competitor/online_pros");
      } else {
         router.push("/food_purchase_location");
      }
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
            {t.qs_monthly_cost}
         </div>

         {error && (
            <p className="text-red-500 text-center mb-2">
               Bitte wählen Sie eine Option aus
            </p>
         )}

         {/* Answer Buttons */}
         <div className="flex flex-col gap-4 items-center justify-center mt-10 px-4">
            <button
               type="button"
               onClick={() => setSelected("20€ - 40€")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "20€ - 40€"
               )}`}
            >
               {"20€ - 40€"}
            </button>

            <button
               type="button"
               onClick={() => setSelected("40€ - 80€")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "40€ - 80€"
               )}`}
            >
               {"40€ - 80€"}
            </button>

            <button
               type="button"
               onClick={() => setSelected("80€ - 120€")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "80€ - 120€"
               )}`}
            >
               {"80€ - 120€"}
            </button>
            <button
               type="button"
               onClick={() => setSelected("mehr las 120€")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "mehr las 120€"
               )}`}
            >
               {"mehr las 120€"}
            </button>
         </div>

         {/* Footer */}
         <FooterComponent onBack={handleBack} isSubmit />
      </form>
   );
}
