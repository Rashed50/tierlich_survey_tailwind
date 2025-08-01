"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";
import { updateSurveyQuestionAnwser } from "@/config/surveyQsAndAnswer"; // insert or update survey information



export default function SetNumberOfPet() {
   const [selected, setSelected] = useState();
     const [plz_no, setPLZNo] = useState();
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



            try {
                  const pet_owner_id = sessionStorage.getItem("pet_owner_id");
                  const result =  updateSurveyQuestionAnwser({ pet_owner_id:pet_owner_id, sv_qs_id: 21,qs_answer: plz_no });
                  console.log('Inserted:', result);
               } catch (err) {
                  console.error('Error inserting user:', err);
               } finally { 
                          router.push("/food_purchase_location/monthly_spent/lead_interested");
               }

   };

   const handleBack = () => {
      router.push("/food_purchase_location/monthly_spent/exceptional_note");
   }

   const getButtonStyle = (option) =>
      option === selected
         ? "bg-white text-[#4A3A2D] border-2 border-[#4A3A2D]"
         : "bg-[#4A3A2D] text-white";

   return (
      <form
         onSubmit={handleSubmit}
         className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]"
      >
         <HeaderComponent progress={  (100*21)/30 } />

         {/* Question Text */}
         <div className="text-center mt-10 px-4 text-xl font-semibold">
            {t.qs_pet_owner_living_location}
         </div>

         {/* Answer Buttons */}
         <div className="flex flex-col gap-4 items-center justify-center mt-10 px-4">
            <input
               type="text"
                value={selected}
               // onChange={(e) => setPLZNo(e.target.value)}
                  onChange={(e) => setPLZNo(e.target.value)}
               placeholder="Enter Ihr PLZ information"
               className="w-full max-w-xs h-10 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
         </div>

         {/* Footer */}
         <FooterComponent onBack={handleBack} isSubmit />
      </form>
   );
}
