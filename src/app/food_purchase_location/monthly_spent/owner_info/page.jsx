"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";
import { updatePetOwnerNameAndEmailInformation } from "@/config/surveyQsAndAnswer"; // insert or update survey information
import supabase from "@/config/supabaseClient";


export default function SetNumberOfPet() {
   const [selected, setSelected] = useState();
   const [error, setError] = useState(false);
   const [owner_name, setOwnerName] = useState("");
   const [email, setOwnerEmail] = useState("demo1@gamil.com");
   const router = useRouter();

   const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
   const t = langContent[lang];

   // Begining of Home page set all session value
   useEffect(() => {
      // This runs only in the browser
      const storedValue = sessionStorage.getItem("number_of_pets");
      console.log(storedValue);
      if (storedValue) {
         //  setSelected(storedValue);
      }
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!owner_name || !email) {
         setError(true);
         return;
      }
      updatePetOwnerNameAndEmail();

      router.push("/share_link");
      return;
   };


      const updatePetOwnerNameAndEmail = async () => {
         
         //qs: Wie Heiss du?
         const pet_owner_id = sessionStorage.getItem("pet_owner_id");
           if (!pet_owner_id) {
            console.warn("No pet_owner_id found in sessionStorage");
            return;
        }
        console.log("Updating pet owner name and email:", owner_name, email);
          const { data, error } = await supabase
                 .from("pet_owners")
                 .update({ owner_name,email })
                 .eq("id", parseInt( pet_owner_id));
          // now working below method
         // const result =  updatePetOwnerNameAndEmailInformation({ pet_owner_id:pet_owner_id, owner_name: owner_name,email:email });
         // console.log('Inserted:', result);
   
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

         {/* Answer Buttons */}
         <div className="flex flex-col gap-2 items-center justify-center mt-10 px-4">
            {error && (
               <p className="text-red-500 mb-2">
                  Bitte wählen Sie eine Option aus
               </p>
            )}

            <div className="flex flex-col gap-1 items-center justify-center mt-10 px-4">
               <p className="text-black-500 mb-2">Wie heißt du?</p>
               <input
                  type="text" value={owner_name} placeholder="Enter Ihr Name"
                  onChange={(e) => setOwnerName(e.target.value)}                  
                  className="w-full max-w-xs h-10 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
               />
            </div>

            <div className="flex flex-col gap-1 items-center justify-center mt-10 px-4">
               <p className="text-black-500 mb-2">
                  Wie is Ihre E-Mail Adresse?
               </p>
               <input
                  type="email"    value={email}  placeholder="Enter E-mail Adresse"
                    onChange={(e) => setOwnerEmail(e.target.value)}
                  className="w-full max-w-xs h-10 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
               />
            </div>
         </div>

         {/* Footer */}
         <FooterComponent
            backHref={"/food_purchase_location/monthly_spent/GDPR"}
            isSubmit
         />
      </form>
   );
}
