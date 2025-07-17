"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";

export default function SetNumberOfPet() {
    const [selected, setSelected] = useState();
    const [petNames, setPetNames] = useState([]);
    const [currentPetName, setCurrentPetName] = useState("");
    const router = useRouter();

    const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "EN";
    const t = langContent[lang];

    const handleBack = () => {
        router.push("/has_pet/how_many");
    };

    const handleAddPetName = () => {
        if (currentPetName.trim() !== "") {
            setPetNames([...petNames, currentPetName]);
            setCurrentPetName("");
        }
    };

    const handleRemovePetName = (index) => {
        const newPetNames = [...petNames];
        newPetNames.splice(index, 1);
        setPetNames(newPetNames);
    };

    return (
        <form className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]">
            <HeaderComponent progress={10} />

            {/* Question Text */}
            <div className="text-center mt-10 text-xl font-semibold px-4">
                {t.enter_pet_names || "Enter your pet names"}
            </div>

            {/* Input Field */}
            <div className="max-w-md mx-auto w-full px-4 mt-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={currentPetName}
                        onChange={(e) => setCurrentPetName(e.target.value)}
                        placeholder={t.pet_name_placeholder || "Pet name"}
                        className="flex-1 h-12 px-4 rounded-lg border border-[#4A3A2D] focus:outline-none focus:ring-2 focus:ring-[#4A3A2D]"
                    />
                    <button
                        type="button"
                        onClick={handleAddPetName}
                        className="bg-[#4A3A2D] text-white px-4 rounded-lg hover:bg-[#3a2a1d] transition"
                    >
                        {t.add || "Add"}
                    </button>
                </div>
            </div>

            {/* Added Pet Names List */}
            <div className="max-w-md mx-auto w-full px-4 mt-6 space-y-2">
                {petNames.map((name, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                        <span className="text-[#4A4A4A]">{name}</span>
                        <button
                            type="button"
                            onClick={() => handleRemovePetName(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <FooterComponent onBack={handleBack} isSubmit={petNames.length > 0} />
        </form>
    );
}