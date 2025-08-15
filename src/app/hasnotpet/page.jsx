"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";
import supabase from "@/config/supabaseClient";


export default function HasNotPet() {
    const [selected, setSelected] = useState();
    const router = useRouter();

    const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
    const t = langContent[lang];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selected) {
            setError(true);
            return;
        }

        //  sessionStorage.setItem("number_of_pets", selected);

        if (selected === "1") {
            router.push("/hasnotpet/pet_type");
            return;
        } else {
            router.push("/hasnotpet/no");
            return;
        }
    };

    const updateQuestionNo14Answer = async () => {
      const pet_owner_id = sessionStorage.getItem("pet_owner_id");
      if (!pet_owner_id) return;
         // update qs answer
         const { error: qs_error } = await supabase
                .from('survery_histories')
                .insert([
                { pet_owner_id:pet_owner_id, sv_qs_id: 14, qs_answer: selected} 
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
            <HeaderComponent progress={10} />

            {/* Question Text */}
            <div className="text-center mt-10 px-4 text-xl font-semibold">
                {t.qs_kommt_ein}
            </div>

            {/* Answer Buttons */}
            <div className="flex flex-col gap-4 items-center justify-center mt-10 px-4">
                <button
                    type="button"
                    onClick={() => setSelected("1")} // ✅ Yes
                    className={`w-full max-w-xs h-14 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                        "1"
                    )}`}
                >
                    {"Ja"}
                </button>
                <button
                    type="button"
                    onClick={() => setSelected("0")} // ✅ No
                    className={`w-full max-w-xs h-14 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                        "0"
                    )}`}
                >
                    {"Nein"}
                </button>
            </div>

            {/* Footer */}
            <FooterComponent backHref="/" isSubmit />
        </form>
    );
}
