"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";
import TextareaInput from "@/components/form/TextareaInput";

export default function SetNumberOfPet() {
   const [selected, setSelected] = useState();
   const [otherText, setOtherText] = useState("");
   const [error, setError] = useState(false);
   const router = useRouter();

   const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
   const t = langContent[lang];

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!selected || (selected === "sonstige" && !otherText.trim())) {
         setError(true);
         return;
      }
      setError(false);

      const selectedValue =
         selected === "sonstige" ? otherText.trim() : selected;

      console.log("Selected option:", selectedValue);

      // sessionStorage.setItem("number_of_pets", selectedValue);
      router.push("/food_purchase_location/monthly_spent?from=online");
   };


   const handleBack = () => {
      router.push("/food_purchase_location/online_competitor/online_pros");
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
         <HeaderComponent progress={100} />

         {/* Question Text */}
         <div className="text-center mt-10 px-4 text-xl font-semibold">
            {t.what_dont_you_like_about_that}
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
               onClick={() => setSelected("Lieferverzögerungen")} 
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Lieferverzögerungen"
               )}`}
            >
               {"Lieferverzögerungen"}
            </button>
            <button
               type="button"
               onClick={() => setSelected("Kein direktes Anfassen")} 
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Kein direktes Anfassen"
               )}`}
            >
               {"Kein direktes Anfassen"}
            </button>

            <button
               type="button"
               onClick={() => setSelected("Rücksendungen kompliziert")} 
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Rücksendungen kompliziert"
               )}`}
            >
               {"Rücksendungen kompliziert"}
            </button>

            <button
               type="button"
               onClick={() => setSelected("Fachberatung fehlt")} 
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Fachberatung fehlt"
               )}`}
            >
               {"Fachberatung fehlt"}
            </button>
            <button
               type="button"
               onClick={() => setSelected("Umweltbelastung")} 
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Umweltbelastung"
               )}`}
            >
               {"Umweltbelastung"}
            </button>

            <button
               type="button"
               onClick={() => setSelected("sonstige")} 
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "sonstige"
               )}`}
            >
               {"sonstige"}
            </button>

            {selected === "sonstige" && (
               <div className="mt-4 w-full max-w-xs mx-auto">
                  <TextareaInput
                     value={otherText}
                     onChange={(e) => setOtherText(e.target.value)}
                     placeholder="Bitte geben Sie den Namen ein"
                     required
                  />
               </div>
            )}

         </div>

         {/* Footer */}
         <FooterComponent onBack={handleBack} isSubmit />
      </form>
   );
}
