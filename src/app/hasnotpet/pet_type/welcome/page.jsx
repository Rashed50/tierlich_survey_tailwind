"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";

export default function HasNotPet() {
    const [selected, setSelected] = useState();
    const router = useRouter();

    const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
    const t = langContent[lang];

    
    const handleSubmit = (e) => {
      //   e.preventDefault();
      //   if (!selected) {
      //       setError(true);
      //       return;
      //   }
 
      router.push("/hasnotpet/no");
       return;
            
      
       
    };

      const getButtonStyle = (option) =>
      option === selected
         ? "bg-white text-[#4A3A2D] border-2 border-[#4A3A2D]"
         : "bg-[#4A3A2D] text-white";


    return (
        <form onSubmit={handleSubmit} className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]">
            <HeaderComponent progress={95} />

              {/* Question Text */}
         <div className="text-center mt-10 px-4 text-xl font-semibold">
            {"Vielen Dank für deine Teilnahme."}            
             
         </div>

         {/* Answer Buttons */}
         <div className="flex flex-col gap-4 items-center justify-center mt-10 px-4">
            {"Pfotenstarke Wahl – da wirst du garantiert nicht dran knabbern! Melde dich einfach bei uns, wenn’s Zeit für dein neues Revier-Equipment ist!"}
         </div>

            

            {/* Footer */}
            <FooterComponent backHref="/set-number-of-pet"  isSubmit />
        </form>
    );
}
