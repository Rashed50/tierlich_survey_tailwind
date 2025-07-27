"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";
import Image from 'next/image';
import supabase from "@/config/supabaseClient";

export default function SetNumberOfPet() {

    const [selected, setSelected] = useState(null);
    const [error, setError] = useState(false);

    const router = useRouter();

    const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "EN";
    const t = langContent[lang];

    useEffect(() => {
        // This runs only in the browser
        const storedValue = sessionStorage.getItem('pet_type');
        console.log(storedValue)
        if (storedValue) {
            setSelected(storedValue);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selected) {
            setError(true);
            // debugger;
            return;
        }

        var pet_type_id = 1; // Hund

        if (selected) {
            console.log('Pet =', selected);

            if (selected === '1') {
                sessionStorage.setItem("pet_type", selected);
                router.push("/has_pet/how_many");
            } else if (selected === '2') {
                pet_type_id = 2;  // Katze
                sessionStorage.setItem("pet_type", selected);
                router.push("/has_pet/how_many");
            } else if (selected === '3') {
                pet_type_id = 3; // Katze und Hund
                sessionStorage.setItem("pet_type", selected);
                router.push("/has_pet/how_many");
            } else {
               
                sessionStorage.setItem("pet_type", selected);
                // router.push("/has_pet/other");
            }
            updateOwnerPetTypeServerInformation(pet_type_id)
        }
    };

    
    
   const updateOwnerPetTypeServerInformation  = async (pet_type) => {
 
       const pet_onwer_id = sessionStorage.getItem("pet_owner_id");
       const { data, error } = await supabase.from('pet_owners').update([{pet_type_id:pet_type}]).eq('id',pet_onwer_id);
     
    };



    const handleBack = () => {
        router.push("/");
    };

    const getOptionStyle = (opt) =>
        opt === selected
            ? "bg-white text-[#4A3A2D] border-2 border-[#4A3A2D]"
            : "bg-[#4A3A2D] text-white";

    return (
        <form onSubmit={handleSubmit} className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]" >
            <HeaderComponent progress={10} />

            <div className="text-center mt-10 px-4 text-xl font-semibold">
                {t.qs_which_pet_has}
            </div>

            {error && (
                <p className="text-red-500 text-center mb-2">Bitte wählen Sie eine Option aus</p>
            )}

            <div className="grid grid-cols-2 gap-4 px-6 mt-10 max-w-md mx-auto">
                {/* Button 1 */}
                <button className={`w-25 h-25 flex items-center justify-center rounded-lg text-2xl font-semibold cursor-pointer hover:opacity-90 transition ${getOptionStyle(
                    '1'
                )}`}
                    type="button"
                    key={0} onClick={() => setSelected('1')}>
                    {/* 🐶 */}
                    <Image
                        src="/dog.png"
                        alt=""
                        width={60}
                        height={60}
                    />
                </button>

                {/* Button 2 */}
                <button className={`w-25 h-25 flex items-center justify-center rounded-lg text-2xl font-semibold cursor-pointer hover:opacity-90 transition ${getOptionStyle(
                    '2'
                )}`}
                    type="button"
                    key={1} onClick={() => setSelected('2')}>
                    {/* 🐱 */}
                    <Image
                        src="/cat.png"
                        alt=""
                        width={60}
                        height={60}
                    />
                </button>

                {/* Button 3 */}
                <button className={`w-25 h-25 flex items-center justify-center rounded-lg text-2xl font-semibold cursor-pointer hover:opacity-90 transition ${getOptionStyle(
                    '3'
                )}`}
                    type="button"
                    key={2} onClick={() => setSelected('3')}>
                    {/* <span>🐶</span>
            <span>🐱</span> */}
                    <Image
                        src="/dog.png"
                        alt=""
                        width={45}
                        height={45}
                    />
                    <Image
                        src="/cat.png"
                        alt=""
                        width={40}
                        height={40}
                    />
                </button>

                {/* Button 4 */}
                <button className={`w-25 h-25 flex items-center justify-center rounded-lg text-2xl font-semibold cursor-pointer hover:opacity-90 transition ${getOptionStyle(
                    '4'
                )}`}
                    type="button"
                    key={3} onClick={() => setSelected('4')}   >
                    text
                </button>

            </div>

            <FooterComponent onBack={handleBack} isSubmit />
        </form>
    );
}
