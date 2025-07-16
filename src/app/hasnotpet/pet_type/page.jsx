"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";

export default function HasNotPet() {
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


        router.push("/hasnotpet/pet_type/welcome");
       
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
            {t.qs_pet_type}       
             
         </div>

          <div className="flex flex-col gap-4 items-center justify-center mt-10 px-4">
               <select
               className="w-full bg-[#8A7B70] px-6 py-3   max-w-xs h-14 rounded-xl text-lg font-semibold hover:opacity-90 transition text-white appearance-none relative"
               // className="appearance-none w-full bg-[#8A7B70] text-white text-sm px-6 py-3 rounded-full focus:outline-none"
             
               defaultValue="" >
                  <option value="" disabled>bitte auswählen</option>
                  <option value="Kleintier">Kleintier</option>
                  <option value="Fisch">Fisch</option>
                  <option value="Vogel">Vogel</option>
                  <option value="Pferd">Pferd</option>
                  <option value="Reptil">Reptil</option>
                  <option   onClick={() => setSelected("Reptil")} value="Sonstige">Sonstige</option>
               </select>

               

               {/* Custom arrow icon */}
               {/* <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white">
               ▼
               </div> */}
         </div>

            

            {/* Footer */}
            <FooterComponent backHref="/set-number-of-pet" nextHref="/hasnotpet/pet_type/welcome" isSubmit />
        </form>
    );
}
