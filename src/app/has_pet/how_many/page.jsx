"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";
import supabase from "@/config/supabaseClient";

export default function HasNotPet() {
   const [selected, setSelected] = useState();
   const [error, setError] = useState(false);
   const [pet_type, setPetType] = useState("");
   const [step, setStep] = useState(1); // 1: Select dog count, 2: Select cat count

   const router = useRouter();

   const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
   const t = langContent[lang];

   useEffect(() => {
      const storedPetTypeValue = sessionStorage.getItem("pet_type") || "1";
      console.log("Pet Type =", storedPetTypeValue);
      if (storedPetTypeValue === "1") {
         setPetType("Hund");
      } else if (storedPetTypeValue === "2") {
         setPetType("Katze");
      } else if (storedPetTypeValue === "3") {
         setPetType("Hund und Katze");
      }

      const storedPetNumber = sessionStorage.getItem("pet_number");
      if (storedPetNumber) {
         try {
            const parsed = JSON.parse(storedPetNumber);
            if (parsed.dog !== undefined) {
               setSelected(parsed.dog);
            } else if (parsed.cat !== undefined) {
               setSelected(parsed.cat);
            } else if (parsed.count !== undefined) {
               setSelected(parsed.count);
            }
         } catch {
            setSelected(storedPetNumber);
         }
      }

      
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();

      if (!selected) {
         setError(true);
         return;
      }

      if (selected === "Mehr als 3") {
         router.push("/food_purchase_location");
         return;
      }

     

      if (pet_type === "Hund und Katze") {

         if (step === 1) {
            // Store dog count and move to cat count selection
            const petData = { dog: selected };
            sessionStorage.setItem("pet_number", JSON.stringify(petData));
            setStep(2);
            setSelected(undefined); // Reset selection for cat count
            setError(false);
            return;
         } else if (step === 2) {
            // Get previously stored dog count
            const prevData = JSON.parse(
               sessionStorage.getItem("pet_number") || "{}"
            );
            // Store both counts as JSON object
            const petData = {
               dog: prevData.dog,
               cat: selected,
               type: "Hund und Katze",
            };
            sessionStorage.setItem("pet_number", JSON.stringify(petData));
             updateOwnerNumberOfPetsServerInformation(selected);
            router.push("/input-pet-name");
         }
      } else {
         // For single pet type
         const petData = {
            count: selected,
            type: pet_type,
         };
         sessionStorage.setItem("pet_number", JSON.stringify(petData));
         updateOwnerNumberOfPetsServerInformation(selected);
         router.push("/input-pet-name");
      }
   };

   const handleBack = () => {
      if (pet_type === "Hund und Katze" && step === 2) {
         // Go back to dog count selection
         setStep(1);
         const prevData = JSON.parse(
            sessionStorage.getItem("pet_number") || "{}"
         );
         setSelected(prevData.dog || undefined);
      } else {
         router.push("/has_pet");
      }
      setError(false);
   };



   const updateOwnerNumberOfPetsServerInformation  = async (number_of_pet) => {

 
       const pet_onwer_id = sessionStorage.getItem("pet_owner_id");
       const { data, error } = await supabase.from('pet_owners').update([{number_of_pet:number_of_pet}]).eq('id',pet_onwer_id);
       console.log(data)
     
    };

   const getOptionStyle = (option) =>
      option === selected
         ? "bg-white text-[#4A3A2D] border-2 border-[#4A3A2D]"
         : "bg-[#4A3A2D] text-white";

   const renderQuestion = () => {
      if (pet_type === "Hund und Katze") {
         return step === 1
            ? "Wie viele Hunde begleiten dich?"
            : "Wie viele Katzen begleiten dich?";
      }
      return `Wie viele ${pet_type} begleiten dich?`;
   };

   return (
      <form
         onSubmit={handleSubmit}
         className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]"
      >
         <HeaderComponent
            progress={
               pet_type === "Hund und Katze" ? (step === 1 ? 30 : 70) : 50
            }
         />

         {/* Question Text */}
         <div className="text-center mt-10 text-xl font-semibold">
            {renderQuestion()}
         </div>

         {error && (
            <p className="text-red-500 text-center mb-2">
               Bitte wählen Sie eine Option aus
            </p>
         )}

         {/* Options */}
         <div className="flex flex-col gap-3 max-w-md mx-auto w-full px-4 mt-10">
            {["1", "2", "3", "Mehr als 3"].map((opt, idx) => (
               <button
                  key={idx}
                  type="button"
                  onClick={() => {
                     setSelected(opt);
                     console.log("Selected number:", opt);
                  }}
                  className={`w-full h-14 rounded-lg text-lg font-semibold hover:opacity-90 transition flex items-center justify-center ${getOptionStyle(
                     opt
                  )}`}
               >
                  {opt}
               </button>
            ))}
         </div>

         {/* Footer */}
         <FooterComponent
            onBack={handleBack}
            isSubmit={!!selected}
            nextText={
               pet_type === "Hund und Katze" && step === 1
                  ? "Weiter"
                  : undefined
            }
         />
      </form>
   );
}
