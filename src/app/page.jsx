"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/dist/server/api-utils";
import YesNoQuestionComponent from "@/components/utils/YesNoQuestionComponent";
import SelectableChoicesComponent from "@/components/utils/SelectableChoicesComponent";
import ChoseComponent from "@/components/ChoseDogCatComponent";
import { langContent } from "@/lib/langContent";

export default function StepManager() {
   const [step, setStep] = useState(1);
   const router = useRouter();
   const [answers, setAnswers] = useState({});

   const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "EN";
   const t = langContent[lang];

   const goToNext = () => setStep((prev) => prev + 1);
   const goToPrev = () => setStep((prev) => prev - 1);

   // ✅ Load answers from sessionStorage (on mount)
   useEffect(() => {
      const q1 = sessionStorage.getItem("question1_ans");
      const q3 = sessionStorage.getItem("question3_ans");

      setAnswers({
         question1_ans: q1,
         question3_ans: q3,
      });
   }, []);

   // ✅ Save Q1 answer
   const handleQuestion1Answer = (answer) => {
      const newAnswers = { ...answers, question1_ans: answer };
      setAnswers(newAnswers);
      sessionStorage.setItem("question1_ans", answer);
      goToNext();
   };

   // ✅ Save Q3 answer
   const handleQuestion3Answer = (answer) => {
      const newAnswers = { ...answers, question3_ans: answer };
      setAnswers(newAnswers);
      sessionStorage.setItem("question3_ans", answer);
      goToNext();
   };

   // ✅ Redirect if step === 3
   useEffect(() => {
      if (step === 3) {
         const petType = sessionStorage.getItem("question2_ans");
         let questionKey = "";

         switch (petType) {
            case "🐱":
               questionKey = "question4";
               break;
            case "🐶":
               questionKey = "question5";
               break;
            case "🐶🐱":
               questionKey = "question6";
               break;
            case "Text":
               questionKey = "question7";
               break;
            default:
               questionKey = null;
         }

         if (questionKey) {
            sessionStorage.setItem("current_question", t[questionKey]);
         }

         router.push("/set-number-of-pet?fromStep=3");
      }
   }, [step, t, router]);

   switch (step) {
      case 1:
         return (
            <YesNoQuestionComponent
               progress={12}
               question={t.question1}
               onAnswer={handleQuestion1Answer}
               selectedValue={answers.question1_ans}
               back={null}
            />
         );

      case 2:
         if (answers.question1_ans === "1") {
            return (
               <ChoseComponent
                  progress={25}
                  question={t.question2}
                  back={goToPrev}
                  next={() => setStep(3)}
               />
            );
         } else {
            return (
               <YesNoQuestionComponent
                  progress={12}
                  question={t.question3}
                  onAnswer={handleQuestion3Answer}
                  selectedValue={answers.question3_ans}
                  back={goToPrev}
               />
            );
         }

      case 3: {
         return <div className="text-center mt-10">Redirecting...</div>;
      }


      default:
         return <div className="text-center mt-10">End of steps</div>;
   }
}
