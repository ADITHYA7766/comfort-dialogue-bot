
/**
 * Get a response from the MedKitAI based on the user's query
 */
export const getMedicalResponse = async (query: string): Promise<string> => {
  // This is a simplified implementation. In a real application, this might
  // call an API or use a more sophisticated mechanism to generate responses.
  
  // Sample responses based on keywords in the query
  if (query.toLowerCase().includes("headache")) {
    return "Headaches can be caused by various factors, including stress, dehydration, lack of sleep, or eye strain. For occasional headaches, rest, hydration, and over-the-counter pain relievers may help. If headaches are severe, persistent, or accompanied by other symptoms, please consult a healthcare professional.";
  } else if (query.toLowerCase().includes("cold") || query.toLowerCase().includes("flu")) {
    return "Common colds and flu are viral infections. Rest, staying hydrated, and taking over-the-counter medication for symptoms can help. Most people recover within 7-10 days. If symptoms persist or worsen, especially with high fever, chest pain, or difficulty breathing, please seek medical attention.";
  } else if (query.toLowerCase().includes("diet") || query.toLowerCase().includes("nutrition")) {
    return "A balanced diet typically includes a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. The specific dietary needs vary based on age, sex, weight, activity level, and health conditions. Consider consulting a registered dietitian for personalized nutrition advice.";
  } else if (query.toLowerCase().includes("exercise") || query.toLowerCase().includes("workout")) {
    return "Regular physical activity is essential for good health. Adults should aim for at least 150 minutes of moderate-intensity or 75 minutes of vigorous-intensity exercise per week, along with muscle-strengthening activities. Always start new exercise routines gradually and consult a healthcare provider if you have existing health conditions.";
  } else if (query.toLowerCase().includes("sleep")) {
    return "Most adults need 7-9 hours of sleep per night. Good sleep hygiene includes maintaining a regular sleep schedule, creating a restful environment, limiting screen time before bed, and avoiding caffeine and large meals close to bedtime. If you consistently have trouble sleeping, consider speaking with a healthcare provider.";
  } else {
    return "Thank you for your question. For specific medical concerns, it's best to consult with a healthcare professional. I can provide general information on common health topics, preventive care, and wellness practices. Please feel free to ask about these areas, and I'll do my best to assist you.";
  }
};
