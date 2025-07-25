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
              debugger;  

         if (selected === "0") {
            router.push("/hasnotpet");
            return;
         }else {
          //           
            router.push("/food_purchase/qs_what_do_you_feed/qs_what_donot_like_feed");
         }
              
         
    };

      const getButtonStyle = (option) =>
      option === selected
         ? "bg-white text-[#4A3A2D] border-2 border-[#4A3A2D]"
         : "bg-[#4A3A2D] text-white";


    return (
        <form onSubmit={handleSubmit} className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]">
            <HeaderComponent progress={100} />

              {/* Question Text */}
         <div className="text-center mt-10 px-4 text-xl font-semibold">
            {t.qs_food_purchase_online}            
          </div>

         {/* Answer Buttons */}
         <div className="flex flex-col gap-4 items-center justify-center mt-10 px-4">


 
            <button type="button"
               onClick={() => setSelected("Zeitersparnis")} // ✅ Yes
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Zeitersparnis"
               )}`}
            >
               {"Zeitersparnis"}
            </button>
            <button  type="button"
               onClick={() => setSelected("Angebote")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Angebote"
               )}`}
            >
               {"Angebote"}
            </button>

            <button  type="button"
               onClick={() => setSelected("Abo Modelle")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Abo Modelle"
               )}`}
            >
               {"Abo Modelle"}
            </button>

            <button  type="button"
               onClick={() => setSelected("Transparenz")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "Transparenz"
               )}`}
            >
               {"Transparenz"}
            </button>
            <button  type="button"
               onClick={() => setSelected("sonstige")} // ✅ No
               className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "sonstige"
               )}`}
            >
               {"sonstige (true=Textfield)"}
            </button>


         </div>

            {/* Footer */}
            <FooterComponent backHref="/food_purchase/qs_what_do_you_feed" nextHref="food_purchase/qs_what_do_you_feed" isSubmit />
        </form>
    );
}
