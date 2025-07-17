"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";

export default function HasNotPet() {
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);
    const [pet_type, setPetType] = useState('');

    const router = useRouter();

    const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
    const t = langContent[lang];

    useEffect(() => {
        const storedPetTypeValue = sessionStorage.getItem('pet_type') || "1"
        console.log("Pet Type =", storedPetTypeValue)
        if (storedPetTypeValue === '1') {
            setPetType("Hund"); // Dog
        } else if (storedPetTypeValue === '2') {
            setPetType("Katze"); // Cat
        } else if (storedPetTypeValue === '3') {
            setPetType("Hund und Katze"); // Dog and Cat
        }

        const storedPetNumberValue = sessionStorage.getItem('pet_number') || "1"
        if (storedPetNumberValue) {
            setSelected(storedPetNumberValue);
        }

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selected) {
            setError(true);
            return;
        }

        if (selected) {
            // console.log('After submit Selected number:', selected); 
            sessionStorage.setItem("pet_number", selected || "1");
            router.push("/inpute-pet-name");
        }
    };

    const handleBack = () => {
        router.push("/has_pet");
    };

    const getOptionStyle = (option) =>
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
                {"Wie viele  " + pet_type + " begleiten dich?"}
            </div>

            {error && (
                <p className="text-red-500 text-center mb-2">Bitte wählen Sie eine Option aus</p>
            )}

            {/* Options */}
            <div className="flex flex-col gap-3 max-w-md mx-auto w-full px-4 mt-10">
                {["1", "2", "3", "4"].map((opt, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => {
                            setSelected(opt);
                            console.log('Selected number:', opt);
                        }}
                        className={`w-full h-14 rounded-lg text-lg font-semibold hover:opacity-90 transition flex items-center justify-center ${getOptionStyle(opt)}`}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            {/* Footer */}
            <FooterComponent onBack={handleBack} isSubmit />
        </form>
    );
}