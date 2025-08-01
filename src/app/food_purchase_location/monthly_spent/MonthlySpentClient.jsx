"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";
import supabase from "@/config/supabaseClient";

export default function MonthlySpentClient() {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const from = searchParams.get("from");

  const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
  const t = langContent[lang];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) {
      setError(true);
      return;
    }

    setError(false);
    // sessionStorage.setItem("number_of_pets", selected);
    updateQuestionNo16Answer();
    router.push("/food_purchase_location/monthly_spent/importance_purchase");
  };

  const handleBack = () => {
   
    if (from === "stationary") {
      router.push("/food_purchase_location/stationary/obstacles");
    } else if (from === "online") {
      router.push("/food_purchase_location/online_competitor/online_pros");
    } else {
      router.push("/food_purchase_location");
    }
  };


  // import supabase from "@/config/supabaseClient";
  //  (100*15)/30 
  const updateQuestionNo16Answer = async () => {
      const pet_owner_id = sessionStorage.getItem("pet_owner_id");
      if (!pet_owner_id) return;
         // update qs answer
         const { error: qs_error } = await supabase
                .from('survery_histories')
                .insert([
                { pet_owner_id:pet_owner_id, sv_qs_id: 16, qs_answer: selected} 
                ])

      
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
      <HeaderComponent progress={ (100*16)/30 } />

      <div className="text-center mt-10 px-4 text-xl font-semibold">
        {t.qs_monthly_cost}
      </div>

      {error && (
        <p className="text-red-500 text-center mb-2">
          Bitte wählen Sie eine Option aus
        </p>
      )}

      <div className="flex flex-col gap-4 items-center justify-center mt-10 px-4">
        {["20€ - 40€", "40€ - 80€", "80€ - 120€", "mehr las 120€"].map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelected(opt)}
            className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(opt)}`}
          >
            {opt}
          </button>
        ))}
      </div>

      <FooterComponent onBack={handleBack} isSubmit />
    </form>
  );
}
