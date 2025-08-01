"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";
import TextareaInput from "@/components/form/TextareaInput"; // ✅ যুক্ত করো
import supabase from "@/config/supabaseClient";


export default function SetNumberOfPet() {
   const router = useRouter();

   const [selected, setSelected] = useState();
   const [otherText, setOtherText] = useState(""); // ✅ নতুন স্টেট
   const [error, setError] = useState(false);

   const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
   const t = langContent[lang];

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!selected || (selected === "sonstige" && !otherText.trim())) {
         setError(true);
         return;
      }
      setError(false);

      const finalValue = selected === "sonstige" ? otherText.trim() : selected;
      console.log("Selected option:", finalValue);

      // sessionStorage.setItem("number_of_pets", finalValue);
      updateQuestionNo17Answer(finalValue)
      router.push("/food_purchase_location/monthly_spent/lead_age");
   };

   const handleBack = () => {
      router.push("/food_purchase_location/monthly_spent/");
   };





     // import supabase from "@/config/supabaseClient";
  //  (100*15)/30 
  const updateQuestionNo17Answer = async (finalValue) => {
      const pet_owner_id = sessionStorage.getItem("pet_owner_id");
      if (!pet_owner_id) return;
         // update qs answer
         const { error: qs_error } = await supabase
                .from('survery_histories')
                .insert([
                { pet_owner_id:pet_owner_id, sv_qs_id: 17, qs_answer: finalValue} 
                ])

      
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
         <HeaderComponent progress={(100*17)/30 } />

         <div className="text-center mt-10 px-4 text-xl font-semibold">
            {t.qs_important_purchase_feature}
         </div>

         {error && (
            <p className="text-red-500 text-center mb-2">
               Bitte wählen Sie eine Option aus
            </p>
         )}

         <div className="flex flex-col gap-4 items-center justify-center mt-10 px-4">
            {["Preis", "Qualität", "Nachhaltigkeit", "Marke", "sonstige"].map(
               (option) => (
                  <button
                     key={option}
                     type="button"
                     onClick={() => setSelected(option)}
                     className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                        option
                     )}`}
                  >
                     {option === "sonstige"
                        ? "sonstige"
                        : option}
                  </button>
               )
            )}

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

         <FooterComponent onBack={handleBack} isSubmit />
      </form>
   );
}
