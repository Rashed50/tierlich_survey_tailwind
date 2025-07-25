"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";

export default function SetNumberOfPet() {
   const [selected, setSelected] = useState();
   const [error, setError] = useState(false);
   const router = useRouter();

   const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
   const t = langContent[lang];



   // Begining of Home page set all session value
   useEffect(() => {
      // This runs only in the browser
      if (typeof window !== 'undefined') {
         const storedValue = sessionStorage.getItem('number_of_pets');
         console.log(storedValue)
         if (storedValue) {
         //   setSelected(storedValue);
         }
      }
   }, []);



   const handleSubmit = (e) => {
      e.preventDefault();
      if (!selected) {
         setError(true);
         return;
      }

      // sessionStorage.setItem("number_of_pets", selected);

       debugger;
      if (selected === "0") { 
         // no button clicked
             router.push("/share_link");
         return;
      } else {
         // yes            
         router.push("/food_purchase/monthly_spent/owner_info");
      }

   };

   const getButtonStyle = (option) =>
      option === selected
         ? "bg-white text-[#4A3A2D] border-2 border-[#4A3A2D]"
         : "bg-[#4A3A2D] text-white";


   return (
      <form onSubmit={handleSubmit} className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]">
         <HeaderComponent progress={10} />

         {/* Question Text */}
         <div className="text-center mt-10 ml-30 mr-30 px-4 text-xl font-semibold">
            {t.info_gdpr_rules}            
  
         </div>

         {/* Answer Buttons */}
         <div className="flex flex-col gap-4 items-center justify-center mt-10 px-4">

            {error && (
               <p className="text-red-500 mb-2">Bitte wählen Sie eine Option aus</p>
            )}

             <button
               type="button"
               onClick={() => setSelected("1")} // ✅ Stationary
               className={`w-full max-w-xs h-14 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "1"
               )}`}
            >
               {"Ja"}
            </button>
            <button
               type="button"
               onClick={() => setSelected("0")} // ✅ Online
               className={`w-full max-w-xs h-14 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "0"
               )}`}
            >
               {"Nein"}
            </button>
         </div>



         {/* Footer */}
         <FooterComponent backHref={"food_purchase/monthly_spent/interested_food_box"}  isSubmit />
      </form>
   );
}
