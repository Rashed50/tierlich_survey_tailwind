"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";

export default function SetNumberOfPet() {
    const [selected, setSelected] = useState();
    const searchParams = useSearchParams();
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

                
      router.push("/food_purchase/monthly_spent");
         
    };

      const getButtonStyle = (option) =>
      option === selected
         ? "bg-white text-[#4A3A2D] border-2 border-[#4A3A2D]"
         : "bg-[#4A3A2D] text-white";


    return (
        <form onSubmit={handleSubmit} className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]">
            <HeaderComponent progress={60} />

              {/* Question Text */}
         <div className="text-center mt-10 px-4 text-xl font-semibold">
            {t.qs_what_donot_like_feed}            
          </div>

         {/* Answer Buttons */}
         <div className="flex flex-col gap-4 items-center justify-center mt-10 px-4">


 
            <button type="button"
               onClick={() => setSelected("Lieferverzögerungen")} // ✅ Yes
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Lieferverzögerungen"
               )}`}
            >
               {"Lieferverzögerungen"}
            </button>
            <button  type="button"
               onClick={() => setSelected("Kein direktes Anfassen")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Kein direktes Anfassen"
               )}`}
            >
               {"Kein direktes Anfassen"}
            </button>

            <button  type="button"
               onClick={() => setSelected("Rücksendungen kompliziert")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Rücksendungen kompliziert"
               )}`}
            >
               {"Rücksendungen kompliziert"}
            </button>

            <button  type="button"
               onClick={() => setSelected("Fachberatung fehlt")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Fachberatung fehlt"
               )}`}
            >
               {"Fachberatung fehlt"}
            </button>
            <button  type="button"
               onClick={() => setSelected("Umweltbelastung")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Umweltbelastung"
               )}`}
            >
               {"sonstige (true=Textfield)"}
            </button>


         </div>

                

            {/* Footer */}
            <FooterComponent backHref="/food_purchase/qs_what_do_you_feed" nextHref="/food_purchase/monthly_spent" isSubmit />
        </form>
    );
}
