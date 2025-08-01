"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";
import { updateSurveyQuestionAnwser } from "@/config/surveyQsAndAnswer"; // insert or update survey information


export default function SetNumberOfPet() {
   const router = useRouter();
   const [selected, setSelected] = useState();
   const [error, setError] = useState(false);

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

      try {
            const pet_owner_id = sessionStorage.getItem("pet_owner_id");
            const result =  updateSurveyQuestionAnwser({ pet_owner_id:pet_owner_id, sv_qs_id: 20,qs_answer: selected });
            console.log('Inserted:', result);
         } catch (err) {
            console.error('Error inserting user:', err);
         } finally { 
               router.push("/food_purchase_location/monthly_spent/exceptional_note");
         }
         
   };

   const handleBack = () => {
      router.push(
         "/food_purchase_location/monthly_spent/living_conditions_house"
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
         <HeaderComponent progress={  (100*20)/30 } />

         {/* Question Text */}
         <div className="text-center mt-10 px-4 text-xl font-semibold">
            {t.qs_pet_owner_family_statu}
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
               onClick={() => setSelected("Nein ,Single Haushalt")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Nein ,Single Haushalt"
               )}`}
            >
               {"Nein ,Single Haushalt"}
            </button>

            <button
               type="button"
               onClick={() => setSelected("Haushalt mit Partner")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Haushalt mit Partner"
               )}`}
            >
               {"Haushalt mit Partner"}
            </button>
            <button
               type="button"
               onClick={() => setSelected("Haushalt mit Kindern")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Haushalt mit Kindern"
               )}`}
            >
               {"Haushalt mit Kindern"}
            </button>
         </div>

         {/* Footer */}
         <FooterComponent onBack={handleBack} isSubmit />
      </form>
   );
}
