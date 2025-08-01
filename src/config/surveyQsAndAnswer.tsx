import supabase from "@/config/supabaseClient";


export interface QuestionAnswer {
    pet_owner_id: string;
    sv_qs_id: string;
    qs_answer: string;
}

export async function updateSurveyQuestionAnwser(survey_data: QuestionAnswer) {



      const {data,error} = await supabase.from('survery_histories')
                                                .select('*')                                   
                                                //.eq('id', 18 )
                                                .eq('pet_owner_id', parseInt(survey_data["pet_owner_id"]) )
                                                .eq('sv_qs_id', parseInt(survey_data["sv_qs_id"]))
                                             //  .match({, 'sv_qs_id': parseInt(survey_data["sv_qs_id"]  )})
                                                .maybeSingle(); // ✅ avoids throwing if no match


        var  existing_record = data;
        
        console.log("calling Survey Method update operation with Existing data is   ",existing_record,error);
        if(existing_record){
           
            const { data, error } = await supabase
                .from('survery_histories')
                .update({ qs_answer:survey_data["qs_answer"] })
                .eq("id", existing_record["id"]);
            return data;

        }else {
            const { data, error } = await supabase
                    .from('survery_histories')
                    .insert([survey_data])  // or [{ name: ..., email: ... }]
                    .select("*");       // use .select() to get the inserted row back
                if (error) {
                    console.error('Insert error:', error.message);
                    throw new Error(error.message);
                }
                return data;
             console.log("calling Survey Method  insert operation ",survey_data["pet_owner_id"]);
        }
                                            
    
      // return data;
}