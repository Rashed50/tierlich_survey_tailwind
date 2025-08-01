"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";
import Image from "next/image";
import supabase from "@/config/supabaseClient";

export default function SetNumberOfPet() {
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState(false);
    const router = useRouter();
    const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "EN";
    const t = langContent[lang];

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedValue = sessionStorage.getItem("pet_type");
            if (storedValue) {
                setSelected(storedValue);
            }
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selected) {
            setError(true);
            return;
        }

        setError(false);

        if (typeof window !== "undefined") {
            sessionStorage.setItem("pet_type", selected);
        }

        if (selected === "4") {
            router.push("/has_pet/other");
            return;
        }

        const petTypeMap = {
            "1": 1, // Dog
            "2": 2, // Cat
            "3": 3, // Dog + Cat
        };

        const pet_type_id = petTypeMap[selected] || 1;

        await updateOwnerPetTypeServerInformation(pet_type_id);
        router.push("/has_pet/how_many");
    };

    const updateOwnerPetTypeServerInformation = async (pet_type_id) => {
        if (typeof window === "undefined") return;

        const pet_owner_id = sessionStorage.getItem("pet_owner_id");
        if (!pet_owner_id) {
            console.warn("No pet_owner_id found in sessionStorage");
            return;
        }

        const { data, error } = await supabase
            .from("pet_owners")
            .update({ pet_type_id })
            .eq("id", pet_owner_id);

        if (error) {
            console.error("Failed to update pet type:", error);
        } else {
            console.log("Pet type updated:", data);
          var pet_type_name = "Katze und Hund";    
            if (pet_type_id == 1)
                pet_type_name ="Hund";
            else if(pet_type_id == 2)
                pet_type_name ="Katze";

            const { error: itemsError } = await supabase
                .from('survery_histories')
                .insert([
                { pet_owner_id:pet_owner_id, sv_qs_id: 2, qs_answer: pet_type_name} 
                ])
        }
    };

    const handleBack = () => {
        router.push("/");
    };

    const getOptionStyle = (opt) =>
        opt === selected
            ? "bg-white text-[#4A3A2D] border-2 border-[#4A3A2D]"
            : "bg-[#4A3A2D] text-white";

    return (
        <form
            onSubmit={handleSubmit}
            className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A] pb-24 overflow-y-auto"
        >
            <HeaderComponent progress={(100*2)/30} />

            <div className="text-center mt-10 px-4 text-xl font-semibold">
                {t.qs_which_pet_has}
            </div>

            {error && (
                <p className="text-red-500 text-center mb-2">
                    Bitte wählen Sie eine Option aus
                </p>
            )}

            <div className="grid grid-cols-2 gap-4 px-6 mt-10 max-w-md mx-auto">
                {/* Dog */}
                <button
                    className={`w-25 h-25 flex items-center justify-center rounded-lg cursor-pointer hover:opacity-90 transition ${getOptionStyle(
                        "1"
                    )}`}
                    type="button"
                    onClick={() => setSelected("1")}
                >
                    <Image src="/dog.png" alt="Dog" width={60} height={60} />
                </button>

                {/* Cat */}
                <button
                    className={`w-25 h-25 flex items-center justify-center rounded-lg cursor-pointer hover:opacity-90 transition ${getOptionStyle(
                        "2"
                    )}`}
                    type="button"
                    onClick={() => setSelected("2")}
                >
                    <Image src="/cat.png" alt="Cat" width={60} height={60} />
                </button>

                {/* Dog + Cat */}
                <button
                    className={`w-25 h-25 flex gap-1 items-center justify-center rounded-lg cursor-pointer hover:opacity-90 transition ${getOptionStyle(
                        "3"
                    )}`}
                    type="button"
                    onClick={() => setSelected("3")}
                >
                    <Image src="/dog.png" alt="Dog" width={45} height={45} />
                    <Image src="/cat.png" alt="Cat" width={40} height={40} />
                </button>

                {/* Other */}
                <button
                    className={`w-25 h-25 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer hover:opacity-90 transition ${getOptionStyle(
                        "4"
                    )}`}
                    type="button"
                    onClick={() => setSelected("4")}
                >
                    {t.other || "Andere"}
                </button>
            </div>

            <FooterComponent onBack={handleBack} isSubmit />
        </form>
    );
}
