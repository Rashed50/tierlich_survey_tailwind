"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";
import Image from 'next/image';


export default function SetNumberOfPet() {

    //const options = ["🐶", "🐱", "🐶🐱", "Text"];
    const options = ["1", "2", "3", "4"];
    const [selected, setSelected] = useState();
    const [button_index, setButtonIndex] = useState();
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
            debugger;
            return;
        }      

        if (selected === 1) {
            sessionStorage.setItem("pet_type", "Hund");
            router.push("/has_pet/how_many");
            return;
        }else if ( selected === 2) {
            sessionStorage.setItem("pet_type", "Katze");
            router.push("/has_pet/how_many");
            return;
        }
        else if ( selected === 3) {
            sessionStorage.setItem("pet_type", "Hund und Katze") ;
            router.push("/has_pet/how_many");
            return;
        }
        else {
            debugger;
            sessionStorage.setItem("pet_type", "Anderes") ;        
            router.push("/has_pet/other");
            return;
        }

        
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

       const getOptionStyle = (opt) =>
      opt === selected
         ? "bg-white text-[#4A3A2D] border-2 border-[#4A3A2D]"
         : "bg-[#4A3A2D] text-white";

    return (
        <form  onSubmit={handleSubmit}  className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]" >
            <HeaderComponent progress={10} />

            <div className="text-center mt-10 px-4 text-xl font-semibold">
                {t.qs_which_pet_has}            
            </div>

           {/* <div className="grid grid-cols-2 gap-4 px-6 mt-10 max-w-md mx-auto">
            {options.map((opt, index) => (
 
               <button
                  key={index}
                  type="button"
                  onClick={() => setSelected(opt)}
                  className={`w-25 h-25 flex items-center justify-center rounded-lg text-2xl font-semibold cursor-pointer hover:opacity-90 transition ${
                    
                    getOptionStyle(
                     opt
                  )}`}
               >
                <Image  src="/dog.png"    alt=""  width={60}   height={60}    />
               </button>
            ))}
         </div>   */}

         <div className="grid grid-cols-2 gap-4 px-6 mt-10 max-w-md mx-auto">
            {/* Button 1 */}
            <button  className={`w-25 h-25 flex items-center justify-center rounded-lg text-2xl font-semibold cursor-pointer hover:opacity-90 transition ${
                    getOptionStyle(
                     1
                  )}`}
             key={0} onClick={() => setSelected(1)}>
            {/* 🐶 */}
            <Image
                    src="/dog.png"
                    alt=""
                    width={60}
                    height={60}
                />
            </button>

            {/* Button 2 */}
            <button className={`w-25 h-25 flex items-center justify-center rounded-lg text-2xl font-semibold cursor-pointer hover:opacity-90 transition ${
                    getOptionStyle(
                     2
                  )}`}
            key={1} onClick={() => setSelected(2)}>
            {/* 🐱 */}
            <Image
                    src="/cat.png"
                    alt=""
                    width={60}
                    height={60}
                />
            </button>

            {/* Button 3 */}
            <button className={`w-25 h-25 flex items-center justify-center rounded-lg text-2xl font-semibold cursor-pointer hover:opacity-90 transition ${
                    getOptionStyle(
                     3
                  )}`}
            key={2} onClick={() => setSelected(3)}>
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
            <button  className={`w-25 h-25 flex items-center justify-center rounded-lg text-2xl font-semibold cursor-pointer hover:opacity-90 transition ${
                    getOptionStyle(
                     4
                  )}`}
             key={3} onClick={() => setSelected(4)}   >
            text
            </button>

        </div>  

          

             
        <FooterComponent onBack={handleBack} isSubmit />
        </form>
    );
}
