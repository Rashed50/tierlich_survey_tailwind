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

    const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "EN";
    const t = langContent[lang];

    return (
        <form className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]">
            <HeaderComponent progress={10} />

            {/* Question Text */}
            <div className="text-center mt-10 text-xl font-semibold">
                Question
            </div>
               <input
            type="text"
            // value={""}
            // onChange={(e) => setText(e.target.value)}
            placeholder="Enter Pet Name"
            className="w-full max-w-xs h-10 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />

            

            {/* Footer */}
            <FooterComponent backHref="/set-number-of-pet" nextHref="/page6" isSubmit />
        </form>
    );
}
