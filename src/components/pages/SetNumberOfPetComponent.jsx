"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";
import supabase from "@/config/supabaseClient";

export default function SetNumberOfPetComponent() {
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);
    const router = useRouter();

    const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
    const t = langContent[lang];

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedValue = sessionStorage.getItem("number_of_pets");
            if (storedValue) {
                setSelected(storedValue);
                setNumberOfPet(Number(storedValue));
            }
        }
    }, []);

    const handleSelect = (value) => {
        setSelected(value);
        setNumberOfPet(Number(value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selected) {
            setError(true);
            return;
        }
        setError(false);

        if (typeof window !== "undefined") {
            sessionStorage.setItem("number_of_pets", selected);
        }

        await saveInformationInServer();

        if (selected === "0") {
            router.push("/hasnotpet");
        } else {
            router.push("/has_pet");
        }
    };

    const getButtonStyle = (option) =>
        option === selected
            ? "bg-white text-[#4A3A2D] border-2 border-[#4A3A2D]"
            : "bg-[#4A3A2D] text-white";

    // =================== database action ==========================
    const [owner_name, setOwnerName] = useState("annonymous user");
    const [email, setEmail] = useState("annonymous@gmail.com");
    const [number_of_pet, setNumberOfPet] = useState(1);

    const saveInformationInServer = async () => {
        const { data, error } = await supabase
            .from("pet_owners")
            .insert([{ owner_name, email, number_of_pet }])
            .select();
        if (error == null && data) {
            var new_row = data[0];
            if (typeof window !== "undefined") {
                sessionStorage.setItem("pet_owner_id", new_row["id"]);
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]"
        >
            <HeaderComponent progress={10} />

            {/* Question Text */}
            <div className="text-center mt-10 px-4 text-xl font-semibold">
                {"Hast du Haustiere?"}
            </div>

            {/* Answer Buttons */}
            <div className="flex flex-col gap-4 items-center justify-center mt-10 px-4">
                {error && (
                    <p className="text-red-500 mb-2">Bitte wählen Sie eine Option aus</p>
                )}

                <button
                    type="button"
                    onClick={() => handleSelect("1")}
                    className={`w-full max-w-xs h-14 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                        "1"
                    )}`}
                >
                    {"Ja"}
                </button>
                <button
                    type="button"
                    onClick={() => handleSelect("0")}
                    className={`w-full max-w-xs h-14 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                        "0"
                    )}`}
                >
                    {"Nein"}
                </button>
            </div>

            {/* Footer */}
            <FooterComponent isSubmit />
        </form>
    );
}
