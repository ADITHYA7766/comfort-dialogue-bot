
/**
 * Get a response from the MedKitAI based on the user's query
 */
export const getMedicalResponse = async (query: string): Promise<string> => {
  // This is a simplified implementation. In a real application, this might
  // call an API or use a more sophisticated mechanism to generate responses.
  
  const queryLower = query.toLowerCase();
  
  // Basic medical knowledge responses
  if (queryLower.includes("headache")) {
    return "Headaches can be caused by various factors, including stress, dehydration, lack of sleep, or eye strain. For occasional headaches, rest, hydration, and over-the-counter pain relievers may help. If headaches are severe, persistent, or accompanied by other symptoms, please consult a healthcare professional.";
  } 
  else if (queryLower.includes("cold") || queryLower.includes("flu")) {
    return "Common colds and flu are viral infections. Rest, staying hydrated, and taking over-the-counter medication for symptoms can help. Most people recover within 7-10 days. If symptoms persist or worsen, especially with high fever, chest pain, or difficulty breathing, please seek medical attention.";
  } 
  else if (queryLower.includes("diet") || queryLower.includes("nutrition")) {
    return "A balanced diet typically includes a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. The specific dietary needs vary based on age, sex, weight, activity level, and health conditions. Consider consulting a registered dietitian for personalized nutrition advice.";
  } 
  else if (queryLower.includes("exercise") || queryLower.includes("workout")) {
    return "Regular physical activity is essential for good health. Adults should aim for at least 150 minutes of moderate-intensity or 75 minutes of vigorous-intensity exercise per week, along with muscle-strengthening activities. Always start new exercise routines gradually and consult a healthcare provider if you have existing health conditions.";
  } 
  else if (queryLower.includes("sleep")) {
    return "Most adults need 7-9 hours of sleep per night. Good sleep hygiene includes maintaining a regular sleep schedule, creating a restful environment, limiting screen time before bed, and avoiding caffeine and large meals close to bedtime. If you consistently have trouble sleeping, consider speaking with a healthcare provider.";
  } 
  else if (queryLower.includes("blood pressure")) {
    return "Normal blood pressure is typically around 120/80 mmHg. High blood pressure (hypertension) is generally considered to be 130/80 mmHg or higher. Low blood pressure might be below 90/60 mmHg. Regular monitoring is important, especially if you have risk factors. Lifestyle changes like reducing sodium, maintaining a healthy weight, and regular exercise can help manage blood pressure.";
  }
  else if (queryLower.includes("diabetes")) {
    return "Diabetes is a condition where the body either doesn't produce enough insulin or can't effectively use the insulin it produces. Type 1 diabetes is an autoimmune condition, while Type 2 is often related to lifestyle factors. Symptoms may include increased thirst, frequent urination, unexplained weight loss, and fatigue. Management typically involves monitoring blood sugar levels, medication or insulin therapy, healthy eating, and regular physical activity.";
  }
  else if (queryLower.includes("vitamins") || queryLower.includes("supplements")) {
    return "Vitamins and minerals are essential nutrients that your body needs in small amounts for normal function. While a balanced diet is the best way to get nutrients, supplements may be beneficial for certain people with specific deficiencies or health conditions. Always consult with a healthcare provider before starting any supplement regimen, as some can interact with medications or cause side effects.";
  }
  else if (queryLower.includes("heart") || queryLower.includes("cardiovascular")) {
    return "Heart health is influenced by many factors including diet, exercise, stress levels, and genetics. Recommendations for maintaining cardiovascular health include regular physical activity, a diet low in saturated fats and sodium, maintaining a healthy weight, not smoking, and controlling conditions like high blood pressure and diabetes. Regular check-ups can help detect early signs of heart disease.";
  }
  else {
    return "Thank you for your question. For specific medical concerns, it's best to consult with a healthcare professional. I can provide general information on common health topics, preventive care, and wellness practices. Please feel free to ask about these areas, and I'll do my best to assist you.";
  }
};
