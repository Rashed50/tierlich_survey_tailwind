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

         router.push("/food_purchase/stationary/purchase_interval");

         // if (selected === "0") {
         //    router.push("/hasnotpet");
         //    return;
         // }else {
         //  //           
         //    router.push("/has_pet");
         // }
       
    };

      const getButtonStyle = (option) =>
      option === selected
         ? "bg-white text-[#4A3A2D] border-2 border-[#4A3A2D]"
         : "bg-[#4A3A2D] text-white";


    return (
        <form onSubmit={handleSubmit} className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]">
            <HeaderComponent progress={10} />

              {/* Question Text */}
         <div className="text-center mt-10 px-4 text-xl font-semibold">
            {t.qs_food_purchase_stationary}            
          </div>

         {/* Answer Buttons */}
         <div className="flex flex-col gap-4 items-center justify-center mt-10 px-4">


            <button type="button"
               onClick={() => setSelected("Fachmarkt (Bsp. Fressnapf)")} // ✅ Yes
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Fachmarkt (Bsp. Fressnapf)"
               )}`}
            >
               {"Fachmarkt (Bsp. Fressnapf)"}
            </button>

            <button type="button"
               onClick={() => setSelected("Supermarkt/Discounter")} // ✅ Yes
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Supermarkt/Discounter"
               )}`}
            >
               {"Supermarkt/Discounter"}
            </button>

            <button  type="button"
               onClick={() => setSelected("Tierarzt/Tierpraxen")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Tierarzt/Tierpraxen"
               )}`}
            >
               {"Tierarzt/Tierpraxen"}
            </button>

            <button  type="button"
               onClick={() => setSelected("Baumarkt")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Baumarkt"
               )}`}
            >
               {"Baumarkt"}
            </button>

            <button  type="button"
               onClick={() => setSelected("Zoofachhandel")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Zoofachhandel"
               )}`}
            >
               {"Zoofachhandel"}
            </button>
            <button  type="button"
               onClick={() => setSelected("auf Bauernhöfen")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "auf Bauernhöfen"
               )}`}
            >
               {"auf Bauernhöfen"}
            </button>








         </div>

                

            {/* Footer */}
            <FooterComponent backHref="/food_purchase/stationary" nextHref="/food_purchase/stationary/purchase_interval" isSubmit />
        </form>
    );
}
