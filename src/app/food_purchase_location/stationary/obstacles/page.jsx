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

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!selected) {
         setError(true);
         return;
      }
      setError(false);
      console.log("Selected option:", selected);
      //  sessionStorage.setItem("number_of_pets", selected);
      router.push("/food_purchase_location/monthly_spent?from=stationary");
   };

   const handleBack = () => {
      router.push("/food_purchase_location/stationary/purchase_interval");
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
         <HeaderComponent progress={10} />

         {/* Question Text */}
         <div className="text-center mt-10 px-4 text-xl font-semibold">
            {t.qs_food_purchase_stationary_obstacles}
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
               onClick={() => setSelected("Begrenzte Öffnungszeiten")} // ✅ Yes
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Begrenzte Öffnungszeiten"
               )}`}
            >
               {"Begrenzte Öffnungszeiten"}
            </button>
            <button
               type="button"
               onClick={() => setSelected("ein automatischer Nachschub")} // ✅ Yes
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "ein automatischer Nachschub"
               )}`}
            >
               {"ein automatischer Nachschub"}
            </button>

            <button
               type="button"
               onClick={() => setSelected("Schleppen und Treppen steigen")} // ✅ Yes
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Schleppen und Treppen steigen"
               )}`}
            >
               {"Schleppen und Treppen steigen"}
            </button>

            <button
               type="button"
               onClick={() => setSelected("Hohe Preise")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Hohe Preise"
               )}`}
            >
               {"Hohe Preise"}
            </button>

            <button
               type="button"
               onClick={() => setSelected("man vergisst mal was")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "man vergisst mal was"
               )}`}
            >
               {"man vergisst mal was"}
            </button>

            <button
               type="button"
               onClick={() => setSelected("sonstige (true=Textfield)")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "sonstige (true=Textfield)"
               )}`}
            >
               {"sonstige (true=Textfield)"}
            </button>
         </div>

         {/* Footer */}
         <FooterComponent onBack={handleBack} isSubmit />
      </form>
   );
}
