"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";

export default function SetNumberOfPet() {
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "EN";
    const t = langContent[lang];

    const fromStep = searchParams.get("fromStep");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selected) {
            setError(true);
            return;
        }

        sessionStorage.setItem("number_of_pets", selected);
        router.push("/inpute-pet-name");
    };

    const getButtonStyle = (option) =>
        option === selected
            ? "bg-white text-[#4A3A2D] border-2 border-[#4A3A2D]"
            : "bg-[#4A3A2D] text-white";

    const handleBack = () => {
        if (fromStep === "3") {
            router.push("/?step=3");
        } else {
            router.push("/");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]"
        >
            <HeaderComponent progress={10} />

            {/* Question */}
            <div className="text-center mt-10 text-xl font-semibold">
                {t.question4}
            </div>

            {/* Options */}
            <div className="flex flex-col gap-3 max-w-md mx-auto w-full px-4 mt-10">
                {["1", "2", "3", t.question7].map((opt, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => {
                            setSelected(opt);
                            setError(false); // remove error if selected
                        }}
                        className={`w-full h-14 rounded-lg text-lg font-semibold hover:opacity-90 transition flex items-center justify-center ${getButtonStyle(
                            opt
                        )}`}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            {/* Error */}
            {error && (
                <p className="text-center text-red-600 mt-4 font-medium">
                    Please select an option before continuing.
                </p>
            )}

            {/* Footer */}
            <FooterComponent onBack={handleBack} isSubmit />
        </form>
    );
}
