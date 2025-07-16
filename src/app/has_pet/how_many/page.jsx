"use client";
import { useState, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";

export default function HasNotPet() {
    const [selected, setSelected] = useState();
    const searchParams = useSearchParams();
    const [pet_type, setPetType] = useState('');
 
    const router = useRouter();

    const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
    const t = langContent[lang];


      useEffect(() => {
    // Access sessionStorage only in the browser
    const storedValue = sessionStorage.getItem('pet_type')|| "Anderes"
    if (storedValue) {
      setPetType(storedValue);
    }
  }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selected) {
            setError(true);
            return;
        }

         pet_type =  sessionStorage.getItem("pet_type") || "Anderes"


        if (selected === "1") {
            router.push("/hasnotpet/pet_type");
            
            return;
        }else {
            router.push("/hasnotpet/no");
        }
       
    };

      const handleBack = () => {
        if (fromStep === "3") {
            router.push("/?step=3");
        } else {
            router.push("/");
        }
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
                    <HeaderComponent progress={10} />
        
                    {/* Question Text */}
                    <div className="text-center mt-10 text-xl font-semibold">
                         {"Wie viele  "+pet_type+" begleiten dich?" }
                         
                    </div>
        
                    {/* Options */}
                    <div className="flex flex-col gap-3 max-w-md mx-auto w-full px-4 mt-10">
                        {["1", "2", "3", "How ?"].map((opt, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setSelected(opt)}
                                className={`w-full h-14 rounded-lg text-lg font-semibold hover:opacity-90 transition flex items-center justify-center ${getButtonStyle(opt)}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
        
                    {/* Footer */}
                    <FooterComponent onBack={handleBack} backHref={"/has_pet"}   nextHref={"/has_pet/how_many"} isSubmit />
         </form>
    );
}
