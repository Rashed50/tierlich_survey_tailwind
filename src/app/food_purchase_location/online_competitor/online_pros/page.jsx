"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";
import TextareaInput from "@/components/form/TextareaInput"; 
import { updateSurveyQuestionAnwser } from "@/config/surveyQsAndAnswer"; // insert or update survey information


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

      console.log("Selected option:", selected);
      if (selected === "sonstige") {
         console.log("User custom text:", otherText);
      }
      updateQuestionAnswer(selected === "sonstige" ? otherText : selected);
      router.push("/food_purchase_location/online_competitor/online_cons");
   };

   const handleBack = () => {
      router.push("/food_purchase_location/online_competitor/");
   };

   
   const updateQuestionAnswer = async (answer) => {
         //qs: Was gefällt dir da richtig gut, worauf du ungern verzichten würdest?
         // import { updateSurveyQuestionAnwser } from "@/config/surveyQsAndAnswer"; // insert or update survey information

         const pet_owner_id = sessionStorage.getItem("pet_owner_id");
         const result =  updateSurveyQuestionAnwser({ pet_owner_id:pet_owner_id, sv_qs_id: 11,qs_answer: answer });
         console.log('Inserted:', result);         
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
            {t.what_do_you_like_the_most_about_that}
         </div>

         {error && (
            <p className="text-red-500 text-center mb-2">
               Bitte wählen Sie eine Option aus
            </p>
         )}

         {/* Answer Buttons */}
         <div className="flex flex-col gap-4 items-center justify-center mt-10 px-4">
            {["Zeitersparnis", "Angebote", "Abo Modelle", "Transparenz", "sonstige"].map(
               (option) => (
                  <button
                     key={option}
                     type="button"
                     onClick={() => setSelected(option)}
                     className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(option)}`}
                  >
                     {option === "sonstige" ? "sonstige" : option}
                  </button>
               )
            )}

            {selected === "sonstige" && (
               <div className="w-full max-w-xs mt-4">
                  <TextareaInput
                     placeholder="Bitte geben Sie den Grund ein"
                     value={otherText}
                     onChange={(e) => setOtherText(e.target.value)}
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
